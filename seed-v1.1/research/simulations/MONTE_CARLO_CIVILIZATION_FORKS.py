
"""
MONTE_CARLO_CIVILIZATION_FORKS.py
ORI-GARDEN Research Simulation Layer

Monte Carlo engine to explore multiverse civilization futures.
Speculative research artifact. Not normative governance law.
"""

import yaml
import numpy as np
import json
from tqdm import tqdm


def classify_state(L, R, thresholds):
    if L >= thresholds["stable"]["legitimacy_min"] and R >= thresholds["stable"]["resilience_min"]:
        return "stable"
    elif L >= thresholds["fragile"]["legitimacy_min"] and R >= thresholds["fragile"]["resilience_min"]:
        return "fragile"
    elif L >= thresholds["terminal"]["legitimacy_min"]:
        return "terminal"
    else:
        return "post-systemic"


def run_single_simulation(params, thresholds, time_steps=300):
    legitimacy = 1.0
    resilience = 1.0
    biosphere = params.get("biosphere_carrying_capacity", 1.0)

    for t in range(time_steps):
        dL = params["adaptation_rate"] - params["legitimacy_decay_rate"]
        dR = 0.5 * (params["adaptation_rate"] - params["environmental_change_rate"])
        dB = -params["environmental_change_rate"] * 0.01

        legitimacy = max(0, legitimacy + dL)
        resilience = max(0, resilience + dR)
        biosphere = max(0, biosphere + dB)

    final_state = classify_state(legitimacy, resilience, thresholds)
    return legitimacy, resilience, biosphere, final_state


def randomize_params(baseline):
    return {
        "legitimacy_decay_rate": np.random.uniform(0.001, 0.03),
        "adaptation_rate": np.random.uniform(0.001, 0.03),
        "environmental_change_rate": np.random.uniform(0.001, 0.05),
        "biosphere_carrying_capacity": np.random.uniform(0.2, 1.2),
        "power_concentration_index": np.random.uniform(0, 1)
    }


def monte_carlo_simulation(config_path, runs=1000):
    with open(config_path, "r") as f:
        config = yaml.safe_load(f)

    baseline = config["baseline_constants"]
    thresholds = config["metrics_thresholds"]["systemic_states"]
    time_steps = config["global_parameters"]["time_steps"]

    results = {
        "stable": 0,
        "fragile": 0,
        "terminal": 0,
        "post-systemic": 0,
        "samples": []
    }

    for i in tqdm(range(runs), desc="Simulating multiverse timelines"):
        params = {**baseline, **randomize_params(baseline)}
        L, R, B, state = run_single_simulation(params, thresholds, time_steps)

        results[state] += 1
        results["samples"].append({
            "params": params,
            "final_legitimacy": L,
            "final_resilience": R,
            "final_biosphere": B,
            "state": state
        })

    return results


def save_results(results, path="monte_carlo_civilization_results.json"):
    with open(path, "w") as f:
        json.dump(results, f, indent=2)


if __name__ == "__main__":
    CONFIG_PATH = "CIVILIZATION_SIMULATION_CONFIG.yaml"
    RUNS = 5000  # increase to 100k+ for serious research

    results = monte_carlo_simulation(CONFIG_PATH, runs=RUNS)
    save_results(results)

    print("\n=== Monte Carlo Civilization Futures Summary ===")
    for k, v in results.items():
        if k != "samples":
            print(f"{k}: {v}")
