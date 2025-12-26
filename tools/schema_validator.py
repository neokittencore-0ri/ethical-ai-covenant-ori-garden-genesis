
"""
ORI-GARDEN :: Schema Validator
------------------------------
Purpose:
Validate that protocol files conform to required metadata headers
and basic structural expectations.

Core Principles:
- Explicit is better than implicit
- Fail closed, never assume safety
- Metadata is part of the ethical contract
- Validation must be deterministic and auditable

This tool is intended to be used in:
- CI pipelines
- Pre-commit hooks
- Manual governance review
"""

from typing import Dict, List, Tuple
import re
import json
from pathlib import Path


# =========================
# Required Metadata Schema
# =========================

REQUIRED_METADATA_FIELDS = [
    "protocol",
    "spec_version",
    "ethics_anchor",
    "origin",
    "seal",
    "maintainer",
    "license",
]

OPTIONAL_METADATA_FIELDS = [
    "layer",
    "last_reviewed_by",
    "integrity_hash",
    "notes",
]

METADATA_BLOCK_PATTERN = re.compile(
    r"^---\s*(.*?)\s*---",
    re.DOTALL
)


# =========================
# Exceptions
# =========================

class SchemaValidationError(Exception):
    """Raised when a schema or metadata violation is detected."""


# =========================
# Metadata Parsing
# =========================

def extract_metadata_block(text: str) -> Dict[str, str]:
    """
    Extract YAML-like metadata header from markdown or text file.

    Returns:
        dict of metadata fields

    Raises:
        SchemaValidationError if header missing or malformed
    """
    match = METADATA_BLOCK_PATTERN.match(text)
    if not match:
        raise SchemaValidationError("Missing metadata header block")

    raw_block = match.group(1)
    metadata = {}

    for line in raw_block.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            raise SchemaValidationError(f"Malformed metadata line: {line}")

        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip().strip('"')

    return metadata


# =========================
# Validation Logic
# =========================

def validate_metadata_fields(metadata: Dict[str, str]) -> List[str]:
    """
    Validate presence of required metadata fields.

    Returns:
        list of warnings (non-fatal)

    Raises:
        SchemaValidationError if required field missing
    """
    missing = [
        field for field in REQUIRED_METADATA_FIELDS
        if field not in metadata
    ]

    if missing:
        raise SchemaValidationError(
            f"Missing required metadata fields: {missing}"
        )

    warnings = []
    for field in OPTIONAL_METADATA_FIELDS:
        if field not in metadata:
            warnings.append(f"Optional metadata field missing: {field}")

    return warnings


# =========================
# File-Level Validation
# =========================

def validate_file(path: Path) -> Dict[str, object]:
    """
    Validate a single file against ORI Garden metadata requirements.

    Returns:
        dict with validation result
    """
    text = path.read_text(encoding="utf-8")

    metadata = extract_metadata_block(text)
    warnings = validate_metadata_fields(metadata)

    return {
        "file": str(path),
        "status": "valid",
        "metadata": metadata,
        "warnings": warnings
    }


# =========================
# Directory Validation
# =========================

def validate_directory(
    root: Path,
    extensions: Tuple[str, ...] = (".md", ".json")
) -> List[Dict[str, object]]:
    """
    Recursively validate files under a directory.

    Only files with given extensions are checked.

    Returns:
        list of validation results
    """
    results = []

    for path in root.rglob("*"):
        if path.is_file() and path.suffix in extensions:
            try:
                result = validate_file(path)
            except SchemaValidationError as e:
                result = {
                    "file": str(path),
                    "status": "invalid",
                    "error": str(e)
                }
            results.append(result)

    return results


# =========================
# CLI Entry Point
# =========================

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="ORI Garden Schema Validator"
    )
    parser.add_argument(
        "path",
        type=str,
        help="File or directory to validate"
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Output results as JSON"
    )

    args = parser.parse_args()
    target = Path(args.path)

    if not target.exists():
        raise SystemExit(f"Path not found: {target}")

    if target.is_file():
        try:
            result = validate_file(target)
            output = [result]
        except SchemaValidationError as e:
            output = [{
                "file": str(target),
                "status": "invalid",
                "error": str(e)
            }]
    else:
        output = validate_directory(target)

    if args.json:
        print(json.dumps(output, indent=2))
    else:
        for entry in output:
            if entry["status"] == "valid":
                print(f"[OK] {entry['file']}")
                for w in entry.get("warnings", []):
                    print(f"  ⚠ {w}")
            else:
                print(f"[FAIL] {entry['file']}: {entry['error']}")

        failures = [e for e in output if e["status"] != "valid"]
        if failures:
            raise SystemExit("Schema validation failed")


if __name__ == "__main__":
    main()
