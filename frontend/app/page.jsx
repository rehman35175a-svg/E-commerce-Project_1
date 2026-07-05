
import axios from 'axios';
import Link from "next/link";


export default async function Home() {
  let products = [];
  let error = null;
     
  try{
    const response = await axios.get('http://127.0.0.1:8000');
    products = (response.data);

  }catch(err){
    error = ({status: err.response?.status || "Network Error", message: err.response?.data?.message || err.message || "Unknown error"});
  }
 
return(
      <>  
  {/* ========================= SECTION MAIN ========================= */}
  <section className="section-intro padding-y-sm">
    <div className="container">
      <div className="intro-banner-wrap">
        <img src="images/banners/1.jpg" className="img-fluid rounded" />
      </div>
    </div>{" "}
    {/* container //  */}
  </section>
  {/* ========================= SECTION MAIN END// ========================= */}
  {/* ========================= SECTION  ========================= */}
  <section className="section-name padding-y-sm">
    <div className="container">
      <header className="section-heading">
        <Link href={"/store"} className="btn btn-outline-primary float-right">
        
          See all
        
        </Link>
        <h3 className="section-title">Popular products</h3>
      </header>
      {/* sect-heading */}
      <div className="row">
     
        
        
        { products.length > 0 ?(
          products.slice(0, 12).map((product) => (
            <div className="col-md-3" key={product.id}>
          <div className="card card-product-grid">
           
            <Link href={`/${product.category_key.SLug}/${product.slug}`} className="img-wrap"> 
              <img src={product.image || "images/items/1.jpg"} alt={product.name} />
            </Link>
            <figcaption className="info-wrap">

              <Link href={`/${product.category_key.SLug}/${product.slug}`} className="title"> {product.Product_name} </Link>
              <div className="price-wrap mt-2">
                    {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(product.price)} {/* price-wrap.// */}
                      <del className="price-old">$1980</del>
              </div>{" "}
                    
              
            </figcaption>
          </div>
        </div>
          ))
        ) : ( error && (
          
          <div className='text-danger'> {error.status} - {error.message} </div> )
        )}
        
       
      </div>
      {/* row.// */}
    </div>
    {/* container // */}
  </section>
  {/* ========================= SECTION  END// ========================= */}
  {/* ========================= FOOTER ========================= */}
  
</>

    
  );
}
