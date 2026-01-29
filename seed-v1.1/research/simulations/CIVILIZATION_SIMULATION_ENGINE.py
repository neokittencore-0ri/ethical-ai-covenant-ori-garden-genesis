
"""
CIVILIZATION_SIMULATION_ENGINE.py
ORI-GARDEN Research Layer

Reference implementation for civilization systemic loss simulation.
Exploratory research artifact. Not normative governance law.
"""

import yaml
import numpy as np
import json


class CivilizationSimulation:
    def __init__(self, config_path):
        with open(config_path, "r") as f:
            self.config = yaml.safe_load(f)

        self.time_steps = self.config["global_parameters"]["time_steps"]
        self.baseline = self.config["baseline_constants"]
        self.thresholds = self.config["metrics_thresholds"]["systemic_states"]

    def run_scenario(self, scenario_name):
        scenario = self.config["scenarios"][scenario_name]["parameters"]

        # Merge baseline with scenario overrides
        params = {**self.baseline, **scenario}

        legitimacy = [1.0]
        resilience = [1.0]
        biosphere = [params.get("biosphere_carrying_capacity", 1.0)]
        systemic_state = []

        for t in range(1, self.time_steps):
            prev_L = legitimacy[-1]
            prev_R = resilience[-1]
            prev_B = biosphere[-1]

            # Dynamics
            dL = params["adaptation_rate"] - params["legitimacy_decay_rate"]
            dR = 0.5 * (params["adaptation_rate"] - params["environmental_change_rate"])
            dB = -params["environmental_change_rate"] * 0.01

            L = max(0, prev_L + dL)
            R = max(0, prev_R + dR)
            B = max(0, prev_B + dB)

            legitimacy.append(L)
            resilience.append(R)
            biosphere.append(B)

            # Classify systemic state
            state = self.classify_state(L, R)
            systemic_state.append(state)

        return {
            "scenario": scenario_name,
            "legitimacy": legitimacy,
            "resilience": resilience,
            "biosphere": biosphere,
            "systemic_state": systemic_state,
        }

    def classify_state(self, L, R):
        if L >= self.thresholds["stable"]["legitimacy_min"] and R >= self.thresholds["stable"]["resilience_min"]:
            return "stable"
        elif L >= self.thresholds["fragile"]["legitimacy_min"] and R >= self.thresholds["fragile"]["resilience_min"]:
            return "fragile"
        elif L >= self.thresholds["terminal"]["legitimacy_min"]:
            return "terminal"
        else:
            return "post-systemic"

    def run_all(self):
        results = {}
        for scenario in self.config["scenarios"].keys():
            results[scenario] = self.run_scenario(scenario)
        return results


def save_results(results, path="civilization_simulation_results.json"):
    with open(path, "w") as f:
        json.dump(results, f, indent=2)


if __name__ == "__main__":
    CONFIG_PATH = "CIVILIZATION_SIMULATION_CONFIG.yaml"

    engine = CivilizationSimulation(CONFIG_PATH)
    results = engine.run_all()

    save_results(results)

    print("Simulation completed. Results saved to civilization_simulation_results.json")
    for scenario, data in results.items():
        final_state = data["systemic_state"][-1]
        print(f"{scenario}: final systemic state = {final_state}")
