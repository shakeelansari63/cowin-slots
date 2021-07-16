interface state {
    state_id: number;
    state_name: string;
}
export interface States {
    states: state[];
    ttl: number
}

interface district {
    district_id: number;
    district_name: string;
}
export interface Districts {
    districts: district[];
    ttl: number;
}