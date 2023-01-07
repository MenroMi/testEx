class Products {

    getProducts = async () => {
        let req = await fetch("https://reqres.in/api/products")
            .then(data => data.json())
            .catch(error => alert(error.toString()));


        return req;

    }

}


export default Products;