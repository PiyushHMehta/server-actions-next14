// 'use client'

// import { fetchProductList } from "@/actions"
// import { useEffect, useState } from "react"

// function ClientPageExample() {
//     const [products, setProducts] = useState([])
    
//     async function getProductList() {
//         const data = await fetchProductList()
//         // console.log(data); 
//         if(data) {
//             setProducts(data)
//         }
//     }
    
//     useEffect(() => {
//         getProductList()
//     }, [])

//     return (
//         <div>
//             <h1>Client page server action</h1>
//             <ul>
//                 {products && products.length > 0 && (
//                     products.map(product => (
//                         <li key={product.id}>
//                             {product.title}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </div>
//     )
// }

// export default ClientPageExample