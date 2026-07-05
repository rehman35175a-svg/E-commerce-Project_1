
import axios from 'axios';
import Link from 'next/link';
import LeftSideBar from "../../components/commonLayouts/leftsidebar";


export default async function Store(){
  let products = [];
  let error = null;
      
  try{
    const  response = await axios.get('http://127.0.0.1:8000');
    products = (response.data);

  }catch(err){
    error = ({status: err.response?.status || "Network Error", message: err.response?.data?.message || err.message || "Unknown error"})
  }
 
return(
      <>
  {/* ========================= SECTION MAIN ========================= */}
  <section className="section-pagetop bg">
    <div className="container">
      <h2 className="title-page">Our Store</h2>
    </div>{" "}
    {/* container //  */}
  </section>
  {/* ========================= SECTION INTRO END// ========================= */}
  {/* ========================= SECTION CONTENT ========================= */}
  <section className="section-content padding-y">
    <div className="container">
      <div className="row">

        <LeftSideBar />


        {/* col.// */}
        <main className="col-md-9">
          <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
              {products.length > 0 && (
              <span className="mr-md-auto">{products.length} Items found </span>)}
            </div>
          </header>
          {/* sect-heading */}
          <div className="row">



            {products.length > 0 ?(
              products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <figure className="card card-product-grid">
                <div className="img-wrap">
                  <img src={product.image} />
                </div>{" "}
                {/* img-wrap.// */}
                <figcaption className="info-wrap">
                  <div className="fix-height">
                   <Link href={`/${product.category_key.SLug}/${product.slug}`} className="title"> {product.Product_name} </Link>


                    <div className="price-wrap mt-2">
                    {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(product.price)} {/* price-wrap.// */}
                      <del className="price-old">$1980</del>
                    </div>{" "}
                    {/* price-wrap.// */}
                  </div>
                  {product.stock > 0 ?(
                  <a href="#" className="btn btn-block btn-primary">
                    Add to cart{" "}
                  </a>
                  ):(<label className="btn btn-block btn-secondary">Out of Stock</label>)}
                </figcaption>
              </figure>
            </div>
            ))
            ):(error && (<div className='text-danger'> {error.status} - {error.message} </div>)
            )}
     
          </div>
          {/* row end.// */}
          <nav className="mt-4" aria-label="Page navigation sample">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </main>{" "}
        {/* col.// */}
      </div>
    </div>{" "}
    {/* container .//  */}
  </section>
</>

    );
}