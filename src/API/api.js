export const BASE_URL = "http://20.244.56.144/test"
export const API = {
    AUTH:  BASE_URL + "/auth",
    //http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=100000
    GET_PRODUCTS: (company, category, top, minPrice, maxPrice) => BASE_URL + `/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`,

}

/*
Companies: "ARZ", "FLP", "SNP", "MYN", "AZO"

Categories: "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"
*/