export interface State {
    state_id: number;
    state_name: string;
}
export interface States {
    states: State[];
    ttl: number
}

export interface District {
    district_id: number;
    district_name: string;
}

export interface Districts {
    districts: District[];
    ttl: number;
}

export interface DistrictSearchParams {
    district: number;
    dt: Date;
}

export interface PincodeSearchParams {
    pincode: number;
    dt: Date;
}

export interface Slots {
    address: string;
    allow_all_age: boolean;
    available_capacity: number;
    available_capacity_dose1: number;
    available_capacity_dose2: number;
    block_name: string;
    center_id: number;
    date: string;
    district_name: string;
    fee: string;
    fee_type: string;
    from: string;
    lat: number;
    long: number;
    min_age_limit: number;
    name: string;
    pincode: number;
    session_id: string;
    slots: string[];
    state_name: string;
    to: string;
    vaccine: string;
}

export interface Sessions {
    sessions: Slots[];
}