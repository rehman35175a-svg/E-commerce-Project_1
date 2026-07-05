import axios from 'axios';
import Link from "next/link";

export default async function LeftSideBar(){
  let products = [];
  let error = null;
     
  try{
        const  response = await axios.get(`http://127.0.0.1:8000/category`);
        products = (response.data);
        
      }catch(err){
            error = ({status: err.response?.status || "Network Error", message: err.response?.data?.message || err.message || "Unknown error"})

    }

  
    return(
        <>
        <aside className="col-md-3">
          <div className="card">
            <article className="filter-group">
              <header className="card-header">
                <a
                  href="#"
                  data-toggle="collapse"
                  data-target="#collapse_1"
                  aria-expanded="true"
                  className=""
                >
                  <i className="icon-control fa fa-chevron-down" />
                  <h6 className="title">Categories</h6>
                </a>
              </header>
              <div
                className="filter-content collapse show"
                id="collapse_1"
                style={{}}
              >
                <div className="card-body">
                  <ul className="list-menu">
                    {products.length > 0 && (
                      products.map((product) => (
                    <li key={product.id}>
                      
                      <Link href={`/${product.SLug}`}> {product.Cate_Name}</Link>
                    </li>
                      ))
                    )}
                  </ul>
                </div>{" "}
                {/* card-body.// */}
              </div>
            </article>{" "}
            {/* filter-group  .// */}
            <article className="filter-group">
              <header className="card-header">
                <a
                  href="#"
                  data-toggle="collapse"
                  data-target="#collapse_4"
                  aria-expanded="true"
                  className=""
                >
                  <i className="icon-control fa fa-chevron-down" />
                  <h6 className="title">Sizes </h6>
                </a>
              </header>
              <div
                className="filter-content collapse show"
                id="collapse_4"
                style={{}}
              >
                <div className="card-body">
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> XS </span>
                  </label>
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> SM </span>
                  </label>
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> LG </span>
                  </label>
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> XXL </span>
                  </label>
                </div>
                {/* card-body.// */}
              </div>
            </article>{" "}
            {/* filter-group .// */}
            <article className="filter-group">
              <header className="card-header">
                <a
                  href="#"
                  data-toggle="collapse"
                  data-target="#collapse_3"
                  aria-expanded="true"
                  className=""
                >
                  <i className="icon-control fa fa-chevron-down" />
                  <h6 className="title">Price range </h6>
                </a>
              </header>
              <div
                className="filter-content collapse show"
                id="collapse_3"
                style={{}}
              >
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Min</label>
                      {/* <input class="form-control" placeholder="$0" type="number"> */}
                      <select className="mr-2 form-control">
                        <option value={0}>$0</option>
                        <option value={50}>$50</option>
                        <option value={100}>$100</option>
                        <option value={150}>$150</option>
                        <option value={200}>$200</option>
                        <option value={500}>$500</option>
                        <option value={1000}>$1000</option>
                      </select>
                    </div>
                    <div className="form-group text-right col-md-6">
                      <label>Max</label>
                      <select className="mr-2 form-control">
                        <option value={50}>$50</option>
                        <option value={100}>$100</option>
                        <option value={150}>$150</option>
                        <option value={200}>$200</option>
                        <option value={500}>$500</option>
                        <option value={1000}>$1000</option>
                        <option value={2000}>$2000+</option>
                      </select>
                    </div>
                  </div>{" "}
                  {/* form-row.// */}
                  <button className="btn btn-block btn-primary">Apply</button>
                </div>
                {/* card-body.// */}
              </div>
            </article>{" "}
            {/* filter-group .// */}
          </div>{" "}
          {/* card.// */}
        </aside>
        </>

    )
}