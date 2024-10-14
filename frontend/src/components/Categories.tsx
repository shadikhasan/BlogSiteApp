import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CategoryContext } from '../CategoryContext';
import './Categories.css'; // Import your CSS file

interface Category {
    category: string; // Updated to match the API response
    post_count: number; // Updated to match the API response
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const context = useContext(CategoryContext);
    const containerRef = useRef<HTMLDivElement>(null); // Create a ref for the container

    if (!context) {
        return null; // Handle context being null
    }

    const { setSelectedCategoryName, resetPage } = context;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/category-post-count/');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategoryName(categoryName);
        resetPage();

        if (containerRef.current) {
            // Scroll to the top of the container
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="categories-container" ref={containerRef}>
            <h3 className="categories-title">Categories</h3>
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category.category} className="category-item" onClick={() => handleCategoryClick(category.category)}>
                        <div className="category-header">
                            <span className="category-name">{category.category}</span>
                            <span className="post-count">({category.post_count})</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
