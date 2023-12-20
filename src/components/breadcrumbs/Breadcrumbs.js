import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {
    return (
        <nav className="breadcrumbs">
            <ul className="breadcrumbs-list">
                {!items.length
                    ? "breadcrumbs"
                    : items.map(({ name = "", href = "", icon}, index) => {
                          const Tag = href ? Link : "p";
                          return (
                              <li key={index} className="breadcrumbs-item">
                                  <Tag
                                      to={href}
                                      className={`breadcrumbs-link ${!href ? "breadcrumbs-link-active" : ""}`}
                                  >
                                      {icon}
                                      {name}
                                  </Tag>
                              </li>
                          );
                      })}
            </ul>
        </nav>
    );
}
