import React from "react";
import localData from "../../../localData";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function ProductCard({ thumbnailUrl, title, id }) {
    const { preloader } = localData.images;

    return (
    //    <div data-lazy="fade-up"> // add tag if lazy loading required
         <div className="card product-card">
             <Link to={`/products/${id}`} className="card-header"  >
                 <img
                    //  data-src={thumbnailUrl}  // add tag if lazy loading required
                    // src={preloader}  // replace with src tag if lazy loading required
                     src={thumbnailUrl}
                     className="card-img"
                     alt={title}
                 />
             </Link>
             <div className="card-body">
                 <h4 className="card-title">{title}</h4>
                 <p className="card-price">{id}</p>
                 <Button className="rounded-pill d-block" variant="contained">
                     add to cart
                 </Button>
             </div>
         </div>
    //    </div>
    );
}
