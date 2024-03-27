import React, { useEffect, useState } from 'react'
import { API } from '../API/api'
import { httpGet, httpPost } from '../API/http-utils'

import { Box, Flex, Heading, Text, Button, Image, Stack, SimpleGrid } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import {Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure } from "@chakra-ui/react";
import { Badge, useToast } from "@chakra-ui/react";


const ProductsList = ({ products }) => {
    return (
      <Box p={5}>
        <Heading mb={5}>All Products</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {products.map((product) => (
            <Box key={product.id} p={5} shadow="md" borderWidth="1px">
              <Image borderRadius="md" src={`https://source.unsplash.com/random/?${product.productName}`} alt={product.productName}
                width={"400px"}
                height={"400px"}
                objectFit={"cover"}
              />
              <Flex align="baseline" mt={2}>
                <Heading fontSize="xl" fontWeight="semibold" lineHeight="short">
                  {product.productName}
                </Heading>
                <Text ml={2} color="gray.600" textTransform="uppercase" fontSize="sm" fontWeight="bold">
                  {product.category}
                </Text>
              </Flex>
              <Text mt={2} color="gray.500">
                {product.description}
              </Text>
              <Stack direction="row" align="center" justify="space-between" mt={5}>
                <Text fontWeight="semibold" fontSize="lg">
                  ${product.price}
                </Text>
                <Badge colorScheme={product.availability === "yes" ? "green" : "red"}>
                  {product.availability === "yes" ? "In Stock" : "Out of Stock"}
                </Badge>
              </Stack>
              <Text mt={2}>
                Rating: {product.rating}
              </Text>
              <Button colorScheme="teal" mt={2}>View product</Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  };






  const FilterTab = ({ onFilter }) => {
    const companies = ["ARZ", "FLP", "SNP", "MYN", "AZO"];
    const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];
    const ratings = [1, 2, 3, 4, 5];
    const availabilities = ["yes", "out-of-stock"];
  
    const [selectedCompany, setSelectedCompany] = useState("ARZ");
    const [selectedCategory, setSelectedCategory] = useState("Laptop");
    const [noOfProducts, setNoOfProducts] = useState(10);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(100000);
  
    const handleFilter = () => {
        console.log(selectedCompany, selectedCategory, noOfProducts, minPrice, maxPrice, "filtering...")
      onFilter({
        selectedCompany,
        selectedCategory,
        noOfProducts,
        minPrice,
        maxPrice
      });
    };
  
    return (
      <Box p={5} shadow="md" borderWidth="1px">
        <FormControl id="company">
          <FormLabel>Company</FormLabel>
          <Select placeholder="Select company" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="category" mt={4}>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="priceRange" mt={4}>
          <FormLabel>Price Range</FormLabel>
          <Box display="flex" justifyContent="space-between">
            <Input type="number" placeholder="Min price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <Input type="number" placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </Box>
        </FormControl>
        <FormControl id="rating" mt={4}>
          <FormLabel>Rating</FormLabel>
          <Select placeholder="Select rating" value={noOfProducts} onChange={(e) => setNoOfProducts(e.target.value)}>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme="teal" mt={5} onClick={handleFilter}>
          Apply Filters
        </Button>
      </Box>
    );
  };



export default function Home() {
  const authURL = API.AUTH
  //POST request to get access token
  const body = {
    "companyName": "goMart",
    "clientID": "b69d6098-3bc7-4a02-b7da-8add89973298",
    "clientSecret": "vInjoCDrraRlgXkz",
    "ownerName": "Sanajana Sharma",
    "ownerEmail": "21102100@mail.jiit.ac.in",
    "rollNo": "21102100"
}
//use fetch to get access token
 const getAccessToken = async () => {
    const response = await fetch(authURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
    } else {
        console.log(data.message);
    }
    
 }

 useEffect(() => {
    getAccessToken()
}, [])
const [selectedCompany, setSelectedCompany] = React.useState("ARZ");
const [selectedCategory, setSelectedCategory] = React.useState("Laptop");
const [minPrice, setMinPrice] = React.useState(1);
const [maxPrice, setMaxPrice] = React.useState(1000000);
const [noOfProducts, setNoOfProducts] = React.useState(10);
const [loading, setLoading] = React.useState(false);
const toast = useToast();
const getProducts = async (selectedCompany, selectedCategory, noOfProducts, minPrice, maxPrice) => {
    //GET_PRODUCTS: (company, category, top, minPrice, maxPrice) => BASE_URL + `/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    const url = API.GET_PRODUCTS(selectedCompany, selectedCategory, noOfProducts, minPrice, maxPrice);
    const response = await httpGet(url, setLoading, toast);
    console.log(response);
}


  //check if bearer
  const sampleProducts = [
    {
        "productName": "Laptop 1",
        "price": 8521,
        "rating": 4.62,
        "discount": 91,
        "availability": "yes"
    },
    {
        "productName": "Laptop 9",
        "price": 1742,
        "rating": 4.5,
        "discount": 39,
        "availability": "out-of-stock"
    },
    {
        "productName": "Laptop 10",
        "price": 7145,
        "rating": 3.85,
        "discount": 15,
        "availability": "yes"
    },
    {
        "productName": "Laptop 10",
        "price": 4101,
        "rating": 3.78,
        "discount": 37,
        "availability": "yes"
    },
    {
        "productName": "Laptop 11",
        "price": 5683,
        "rating": 3.76,
        "discount": 56,
        "availability": "yes"
    },
    {
        "productName": "Laptop 1",
        "price": 2236,
        "rating": 3.51,
        "discount": 63,
        "availability": "out-of-stock"
    },
    {
        "productName": "Laptop 14",
        "price": 9254,
        "rating": 3.15,
        "discount": 56,
        "availability": "yes"
    },
    {
        "productName": "Laptop 13",
        "price": 1244,
        "rating": 2.96,
        "discount": 45,
        "availability": "yes"
    },
    {
        "productName": "Laptop 11",
        "price": 2652,
        "rating": 2.88,
        "discount": 70,
        "availability": "yes"
    },
    {
        "productName": "Laptop 13",
        "price": 8686,
        "rating": 2.69,
        "discount": 24,
        "availability": "out-of-stock"
    }
]

const handleFilter = (selectedCompany,
    selectedCategory,
    noOfProducts,
    minPrice,
    maxPrice) => {
    setSelectedCompany(selectedCompany);
    setSelectedCategory(selectedCategory);
    setNoOfProducts(noOfProducts);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    getProducts(selectedCompany, selectedCategory, noOfProducts, minPrice, maxPrice);
}
const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDir={"column"}>
      <Button onClick={onOpen}>Filter</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Filter Products</DrawerHeader>
            <DrawerBody>
              <FilterTab onFilter={handleFilter} />
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <ProductsList products={sampleProducts} />
    </Flex>
  )
}
