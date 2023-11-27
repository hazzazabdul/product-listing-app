/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "./Utils/utils";

export const App = () => {
  // main array of objects state || product state || products array of objects
  const [products, setProducts] = useState(getDataFromLocalStorage());
  // input field states
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  // clear inputs
  const clearInputs = () => {
    setProductName("");
    setPrice("");
    setProductId("");
    setQuantity("");
    setDescription("");
    setColor("");
  };

  // form submit event

  const handleSubmit = (e) => {
    e.preventDefault();

    const duplicateIdChecking = products.reduce((arr, obj) => {
      arr.push(obj.productId);
      return arr;
    }, []);
    const product = {
      productId,
      productName,
      price,
      quantity,
      description,
      color,
    };

    if (!duplicateIdChecking.includes(productId)) {
      setProducts([...products, product]);
    } else alert("Input A valid Id");
    clearInputs();
  };

  // saving data to local storage

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // delete product from LS

  const deleteProduct = (id) => {
    const filtered = products.filter((product) => product.productId !== id);
    setProducts(filtered);
  };
  return (
    <>
      <div className="wrapper">
        <h1>Product Listing App</h1>
        <p>Add and view your Products using local storage</p>
        <div className="main">
          <div className="form-container">
            <form
              onSubmit={handleSubmit}
              className="form-group"
            >
              <label>Product Id</label>
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="form-control"
                required
              ></input>
              <br></br>
              <label>Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-control"
                required
              ></input>
              <br></br>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
                required
              ></input>
              <br></br>
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
                required
              ></input>{" "}
              <br />
              <label htmlFor="color">Select Color</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="select-field"
                required
              >
                <option
                  disabled
                  selected
                  value=""
                >
                  None
                </option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="blue">Navy Blue</option>
                <option value="maroon">Maroon</option>
              </select>{" "}
              <br />
              <label>Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              ></textarea>
              <br></br>
              <button
                type="submit"
                className="btn btn-md"
              >
                ADD
              </button>
            </form>
          </div>

          <div className="view-container">
            {products.length > 0 ? (
              <>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr>
                          <td>{product.productId}</td>
                          <td>{product.productName}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.color}</td>
                          <td>{product.description}</td>
                          <td
                            onClick={() => deleteProduct(product.productId)}
                            className="delete-btn"
                          >
                            <MdDelete color="red" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={() => setProducts([])}
                  className="btn btn-danger btn-md"
                >
                  Remove All
                </button>
              </>
            ) : (
              <div>
                <h2 className="without__product__heading">No Products Added</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
