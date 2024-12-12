import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title"); // Default search criteria

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setFilteredBooks(response.data.data); // Initialize filteredBooks
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredBooks(books); // Reset to full list if search query is empty
    } else {
      const filtered = books.filter((book) => {
        if (searchBy === "title") {
          return book.title.toLowerCase().includes(query.toLowerCase());
        } else if (searchBy === "author") {
          return book.author.toLowerCase().includes(query.toLowerCase());
        } else if (searchBy === "year") {
          return book.publishYear.toString().includes(query);
        }
        return false;
      });
      setFilteredBooks(filtered);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-x-4">
          <select
            className="border-2 border-gray-300 rounded p-2"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Publish Year</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchBy}`}
            className="border-2 border-gray-300 rounded p-2 w-1/2"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-x-4">
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <BooksCard books={filteredBooks} />
      )}
    </div>
  );
};

export default Home;
