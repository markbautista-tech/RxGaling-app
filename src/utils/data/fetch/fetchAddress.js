import { useQuery } from "@tanstack/react-query";

export const useRegions = () => {
    return useQuery({
		queryKey: ["regions"],
		queryFn: () => {
			fetch("https://psgc.cloud/api/regions")
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
		}
    });
};

export const useProvinces = (region) => {
    return useQuery({
        queryKey: ["provinces"],
        queryFn: () => {
            fetch(`https://psgc.cloud/api/regions/${region}/provinces`)
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((err) => console.log(err));
        }
    })
}

export const useMunicipalities = (province) => {
    return useQuery({
        queryKey: ["municipalities"],
        queryFn: () => {
            fetch(`https://psgc.cloud/api/provinces/${province}/cities-municipalities`)
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((err) => console.log(err));
        }
    })
}	

export const useBarangays = (municipality) => {
    return useQuery({
        queryKey: ["barangays"],
        queryFn: () => {
            fetch(`https://psgc.cloud/api/cities-municipalities/${municipality}/barangays`)
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((err) => console.log(err));
        }
    })	
}
