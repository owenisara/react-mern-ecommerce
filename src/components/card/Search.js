import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchQuery } from "../store/SearchSlice";
const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    dispatch(searchQuery(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/shop?" + text);
  };
  return (
    <Form onSubmit={handleSubmit} className="d-flex pe-3 ">
      <Form.Control
        style={{ width: "20rem" }}
        type="search"
        placeholder="Search"
        className="mt-2 "
        aria-label="Search"
        onChange={(e) => handleChange(e)}
      />
    </Form>
  );
};

export default Search;
