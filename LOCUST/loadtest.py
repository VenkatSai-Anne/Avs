from locust import HttpUser, task, between

class testload(HttpUser):
    host = "https://dev.eisglobal.app"
    wait_time = between(1, 3)
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYmI3MTRlZi1mMjQ0LTQwNTItYTUzZS03MGU1NDllMDgxMWYiLCJ1c2VyTmFtZSI6ImJydWNld0B0ZWFtLWVhZ2xlLmNhIiwidXNlclR5cGUiOiJFSVMiLCJyb2xlcyI6W10sImV4cGlyZXMiOiIyMDIzLTA1LTI1VDA5OjMzOjA0LjI5NloiLCJpYXQiOjE2ODQ5MjA3MjR9.x9d8E52qSYxkigzgvv7jB6VP0xoeTycaocDJnJkt8Eo"
    
    @task(1)
    def get2(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.get_header(headers)
        self.get_detail(headers)
        self.get_observations(headers)

    def get_header(self, headers):
        response = self.client.get("/api/birdwildlife/birdstrike-header", headers=headers)
        assert response.status_code == 200
       

    def get_detail(self, headers):
        response = self.client.get("/api/birdwildlife/birdstrike-detail", headers=headers)
        assert response.status_code == 200
       

    def get_observations(self, headers):
        response = self.client.get("/api/wildlife-observation/wildlife-observations", headers=headers)
        assert response.status_code == 200

    @task(1)
    def get(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.wildlife_attractants(headers)
        self.cover_types(headers)
        self.weather_types(headers)
        self.part139_conditions(headers)
        self.part139_sections(headers)
        self.birdstrike_header(headers)
        self.birdstrike_detail(headers)
        self.wildlife_observations(headers)
        self.options(headers)
        self.rscRunways(headers)
        self.apronCustomRemarks(headers)
        self.taxiwayCustomRemarks(headers)
        self.runwayCustomRemarks(headers)
        self.layer(headers)
        self.setting(headers)
        self.authority(headers)
        self.airport(headers)
        self.vehicle(headers)
        self.user(headers)
        self.airmake(headers)
        self.airmodels(headers)
        self.engmake(headers)
        self.engtype(headers)
        self.fliphase(headers)
        self.ligcon(headers)
        self.opname(headers)
        self.preptype(headers)
        self.repotype(headers)
        self.reposource(headers)
        self.wildfamily(headers)
        self.wildgenus(headers)
        self.wildspecies(headers)
        self.cotactions(headers)
        self.cotmethod(headers)
        self.wildactivity(headers)
        self.wildattractent(headers)
        self.fliphase(headers)

    def setting(self, headers):
        self.get_endpoint("/settings", headers=headers)

    def authority(self, headers):
        self.get_endpoint("/api/base/authority", headers=headers)

    def airport(self, headers):
        self.get_endpoint("/api/base/airport", headers=headers)
    
    def vehicle(self, headers):
        self.get_endpoint("/api/base/vehicle", headers=headers)

    def user(self, headers):
        self.get_endpoint("/api/base/user", headers=headers)
        
    def airmake(self, headers):
        self.get_endpoint("/api/birdwildlife/aircraft-makes", headers=headers)
    
    def airmodels(self, headers):
        self.get_endpoint("/api/birdwildlife/aircraft-models", headers=headers)
        
    def engmake(self, headers):
        self.get_endpoint("/api/birdwildlife/engine-makes", headers=headers)
        
    def engtype(self, headers):
        self.get_endpoint("/api/birdwildlife/engine-types", headers=headers)
        
    def fliphase(self, headers):
        self.get_endpoint("/api/birdwildlife/flight-phases", headers=headers)
        
    def ligcon(self, headers):
        self.get_endpoint("/api/birdwildlife/light-conditions", headers=headers)

    def opname(self, headers):
        self.get_endpoint("/api/birdwildlife/operator-names", headers=headers)
        
    def preptype(self, headers):
        self.get_endpoint("/api/birdwildlife/precipitation-types", headers=headers)
        
    def repotype(self, headers):
        self.get_endpoint("/api/birdwildlife/strike-types", headers=headers)
    
    def reposource(self, headers):
        self.get_endpoint("/api/birdwildlife/reporting-sources", headers=headers)
        
    def wildfamily(self, headers):
        self.get_endpoint("/api/birdwildlife/wildlife-families", headers=headers)
        
    def wildgenus(self, headers):
        self.get_endpoint("/api/birdwildlife/wildlife-genus", headers=headers)
    
    def wildspecies(self, headers):
        self.get_endpoint("/api/birdwildlife/wildlife-species", headers=headers)
        
    def cotactions(self, headers):
        self.get_endpoint("/api/wildlife-observation/control-actions", headers=headers)

    def cotmethod(self, headers):
        self.get_endpoint("/api/wildlife-observation/control-methods", headers=headers)
        
    def fliphase(self, headers):
        self.get_endpoint("/api/wildlife-observation/directions", headers=headers)

    def wildactivity(self, headers):
        self.get_endpoint("/api/wildlife-observation/wildlife-activities", headers=headers)

    def wildattractent(self, headers):
        self.get_endpoint("/api/wildlife-observation/wildlife-attractants", headers=headers)
    
    def cover_types(self, headers):
        self.get_endpoint("/wildlife-observation/cover-types", headers)
   
    def weather_types(self, headers):
        self.get_endpoint("/wildlife-observation/weather-types", headers)
    
    def part139_sections(self, headers):
        self.get_endpoint("/birdwildlife/part139-sections", headers)

    def part139_conditions(self, headers):
        self.get_endpoint("/api/birdwildlife/part139-conditions", headers)

    def birdstrike_header(self, headers):
        self.get_endpoint("/api/birdwildlife/birdstrike-header", headers)
    
    def birdstrike_detail(self, headers):
        self.get_endpoint("/api/birdwildlife/birdstrike-detail", headers)

    def wildlife_observations(self, headers):
        self.get_endpoint("/api/wildlife-observation/wildlife-observations", headers)
   
    def options(self, headers):
        self.get_endpoint("/api/rsc/options", headers)
    
    def rscRunways(self, headers):
        self.get_endpoint("/api/rsc/rscRunways", headers)

    def apronCustomRemarks(self, headers):
        self.get_endpoint("/api/rsc/apronCustomRemarks", headers)

    def taxiwayCustomRemarks(self, headers):
        self.get_endpoint("/api/rsc/taxiwayCustomRemarks", headers)
    
    def runwayCustomRemarks(self, headers):
        self.get_endpoint("/api/rsc/runwayCustomRemarks", headers)

    def layer(self, headers):
        self.get_endpoint("/api/base/layer", headers)

    def wildlife_attractants(self, headers):
        self.get_endpoint("/wildlife-observation/wildlife-attractants", headers)

    def get_endpoint(self, endpoint, headers):
        response = self.client.get(endpoint, headers=headers)
        assert response.status_code == 200

    @task(10)
    def aircraftmake(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.perform_resource_operations(headers, "aircraft-makes")

    @task(10)
    def aircraftmodel(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.perform_resource_operations(headers, "aircraft-models")

    @task(10)
    def enginemake(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.perform_resource_operations(headers, "engine-makes")

    @task(10)
    def enginetype(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.perform_resource_operations(headers, "engine-types")

    @task(10)
    def flightphase(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.perform_resource_operations(headers, "flight-phases")

    @task(10)
    def lightcondition(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.perform_resource_operations(headers, "light-conditions")

    @task(10)
    def precipitationtype(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.perform_resource_operations(headers, "precipitation-types")

    @task(10)
    def reporttype(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.perform_resource_operations(headers, "strike-types")

    @task(10)
    def reportingsource(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.perform_resource_operations(headers, "reporting-sources")

    def perform_resource_operations(self, headers, resource_type):
        self.get_resources(headers, resource_type)
        resource_id = self.create_resource(headers, resource_type)
        if resource_id is not None:
            self.patch_resource(resource_id, headers, resource_type)
            self.delete_resource(resource_id, headers, resource_type)

    def get_resources(self, headers, resource_type):
        endpoint = f"/api/birdwildlife/{resource_type}"
        response = self.client.get(endpoint, headers=headers)
        assert response.status_code == 200

    def create_resource(self, headers, resource_type):
        endpoint = f"/api/birdwildlife/{resource_type}"
        payload = {
            "active": False,
            resource_type.replace('-', '_'): "hai",
            "display_order": 1
        }
        response = self.client.post(endpoint, json=payload, headers=headers)
        assert response.status_code == 200
        resource_id = response.json()["id"]
        return resource_id

    def patch_resource(self, resource_id, headers, resource_type):
        endpoint = f"/api/birdwildlife/{resource_type}/{resource_id}"
        payload = {
            "active": False,
            resource_type.replace('-', '_'): "patched",
            "display_order": 2,
            "id": resource_id
        }
        response = self.client.patch(endpoint, json=payload, headers=headers)
        assert response.status_code == 200

    def delete_resource(self, resource_id, headers, resource_type):
        endpoint = f"/api/birdwildlife/{resource_type}/{resource_id}"
        response = self.client.delete(endpoint, headers=headers)
        assert response.status_code == 200


    @task(10)
    def wilddirection(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.get_item(headers, "/api/wildlife-observation/directions", self.create_delete_get_item, "direction")

    @task(10)
    def wildactivity(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.get_item(headers, "/api/wildlife-observation/wildlife-activities", self.create_delete_get_item, "wildlife_activity")

    @task(10)
    def wildattractant(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.get_item(headers, "/api/wildlife-observation/wildlife-attractants", self.create_delete_item, "wildlife_attractant")

    @task(10)
    def controlaction(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.get_item(headers, "/api/wildlife-observation/control-actions", self.create_delete_get_item, "control_action")

    @task(10)
    def controlmethod(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.get_item(headers, "/api/wildlife-observation/control-methods", self.create_delete_get_item, "control_method")

    def perform_resource_operations(self, headers, resource_type):
        self.get_resources(headers, resource_type)
        resource_id = self.create_resource(headers, resource_type)
        if resource_id is not None:
            self.patch_resource(resource_id, headers, resource_type)
            self.delete_resource(resource_id, headers, resource_type)

    def get_resources(self, headers, resource_type):
        endpoint = f"/api/birdwildlife/{resource_type}"
        response = self.client.get(endpoint, headers=headers)
        print(response.status_code)
        assert response.status_code == 200

    def create_resource(self, headers, resource_type):
        endpoint = f"/api/birdwildlife/{resource_type}"
        payload = {
            "active": False,
            resource_type.replace('-', '_'): "hai",
            "display_order": 1
        }
        response = self.client.post(endpoint, json=payload, headers=headers)
        print(response.status_code)
        assert response.status_code == 200
        resource_id = response.json()["id"]
        return resource_id

    def patch_resource(self, resource_id, headers, resource_type):
        endpoint = f"/api/birdwildlife/{resource_type}/{resource_id}"
        payload = {
            "active": False,
            resource_type.replace('-', '_'): "patched",
            "display_order": 2,
            "id": resource_id
        }
        response = self.client.patch(endpoint, json=payload, headers=headers)
        assert response.status_code == 200

    def delete_resource(self, resource_id, headers, resource_type):
        endpoint = f"/api/birdwildlife/{resource_type}/{resource_id}"
        response = self.client.delete(endpoint, headers=headers)
        assert response.status_code == 200

    @task(10)
    def submit_data(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        data = {
            "observations": [{
                "employee_id": "dbb714ef-f244-4052-a53e-70e549e0811f",
                "report_date": "2023-05-26T09:31:14.968Z",
                "UTM_X": 45.33027600005878,
                "UTM_Y": -75.66777706146242,
                "shift_id": 0,
                "vehicle_id": 0,
                "discrepancy_id": 0,
                "active": False,
                "comments": "",
                "temperature": -66,
                "wind_speed": 0,
                "reference_number": 0,
                "number_observed": 0,
                "wind_direction_id": None,
                "cloud_cover_id": None,
                "light_condition_id": None,
                "precipitation_id": None,
                "wildlife_family_id": None,
                "wildlife_genus_id": None,
                "species": None,
                "direction_from_id": None,
                "direction_to_id": None,
                "wildlife_activity_id": None,
                "control_action_id": None,
                "control_method_id": None,
                "wildlife_attractant_id": None,
                "number_taken": 0,
                "number_seen": 0,
                "tower_contacted": False,
                "operations_contacted": False,
                "control_results": "",
                "part139_condition_id": None,
                "id": "local-1685094499",
                "operation": "create"
            }],
            "headers": [{
                "employee_id": "dbb714ef-f244-4052-a53e-70e549e0811f",
                "report_date": "2023-05-25T09:43:44.544Z",
                "UTM_X": 45.32734940509199,
                "UTM_Y": -75.67447185516359,
                "comments": "",
                "species": None,
                "id": "local-1685007937",
                "operation": "create"
            }],
            "details": [{
                "birdstrike_id": "local-1685007937",
                "reporting_source_id": None,
                "flight_phase_id": None,
                "light_condition_id": None,
                "precipitation_id": None,
                "cloud_cover_id": None,
                "aircraft_model_id": None,
                "aircraft_make_id": None,
                "engine_make_id": None,
                "engine_type_id": None,
                "operator_name_id": None,
                "report_type": None,
                "wildlife_family_id": None,
                "wildlife_genus_id": None,
                "part139_condition_id": None,
                "shift_id": 0,
                "vehicle_id": 0,
                "aircraft_height": 0,
                "aircraft_speed": 0,
                "distance_from_airport": 0,
                "size": 0,
                "number_seen": 0,
                "number_struck": 0,
                "pilot_warned": 2,
                "remains_sent": 0,
                "remains_collected": 0,
                "discrepancy_id": 0,
                "flight_number": "",
                "aircraft_registration": "",
                "damage_list": {
                    "Radome": 0,
                    "Windshield": 0,
                    "Nose": 0,
                    "Engine #1": 0,
                    "Engine #2": 0,
                    "Engine #3": 0,
                    "Engine #4": 0,
                    "Propeller": 0,
                    "Wings": 0,
                    "Rotor": 0,
                    "Fuselage": 0,
                    "Landing Gear": 0,
                    "Tail": 0,
                    "Lights": 0,
                    "A Pitot Static": 0,
                    "Tail Rotor": 0,
                    "Other": 0
                },
                "effects_list": {
                    "Aborted Takeoff": 0,
                    "Penetration of Airframe": 0,
                    "Precautionary Landing": 0,
                    "Vision Obscured": 0,
                    "Engine(s) Shut Down": 0,
                    "Engine Ingestion": 0,
                    "Forced Landing": 0,
                    "Engine Uncontained Failure": 0,
                    "Fire": 0,
                    "Other": 0
                },
                "id": "local-1685007937",
                "operation": "create"
            }]
        }
        self.client.post("/api/wildlife-observation/wildlife-observations/bulk", headers=headers, json=data)
        self.client.post("/api/birdwildlife/birdstrike/bulk", headers=headers, json=data)