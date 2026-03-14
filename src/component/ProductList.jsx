import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // ✅ Import Supabase

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Good practice to track errors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Supabase: Fetch all columns (*) from the 'products' table
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;

        console.log("Fetched products:", data); 
        // ✅ Supabase already returns a perfect array of objects, no mapping needed!
        setProducts(data); 

      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); 

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{color: 'red'}}>Error: {error}</p>;
  if (products.length === 0) return <p>No products found in the database.</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Available Products</h2>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '8px',
            width: '250px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>

            {/* ✅ Image render (Exact same as your Firebase code) */}
            {product.coverImageURL && (
              <img 
                src={product.coverImageURL} 
                alt={product.title} 
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }} 
              />
            )}

            <h3 style={{ marginTop: '0' }}>{product.title}</h3>
            <p style={{ color: 'green', fontWeight: 'bold' }}>Price: ${product.price}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p style={{ fontSize: '14px', color: '#555' }}>{product.description}</p>

            <p style={{ fontSize: '12px', fontWeight: 'bold', color: product.isAvailable ? 'green' : 'red' }}>
              {product.isAvailable ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}