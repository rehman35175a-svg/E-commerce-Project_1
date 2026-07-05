

export default function Cart({}){
    return(
        <section className="section-content padding-y bg">
  <div className="container">
    {/* ============================ COMPONENT 1 ================================= */}
    <div className="row">
      <aside className="col-lg-9">
        <div className="card">
          <table className="table table-borderless table-shopping-cart">
            <thead className="text-muted">
              <tr className="small text-uppercase">
                <th scope="col">Product</th>
                <th scope="col" width={120}>
                  Quantity
                </th>
                <th scope="col" width={120}>
                  Price
                </th>
                <th scope="col" className="text-right" width={200}>
                  {" "}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <figure className="itemside align-items-center">
                    <div className="aside">
                      <img src="./images/items/11.jpg" className="img-sm" />
                    </div>
                    <figcaption className="info">
                      <a href="#" className="title text-dark">
                        Camera Canon EOS M50 Kit
                      </a>
                      <p className="text-muted small">
                        Matrix: 25 Mpx <br /> Brand: Canon
                      </p>
                    </figcaption>
                  </figure>
                </td>
                <td>
                  {/* col.// */}
                  <div className="col">
                    <div className="input-group input-spinner">
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-light"
                          type="button"
                          id="button-plus"
                        >
                          {" "}
                          <i className="fa fa-minus" />{" "}
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={1}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-light"
                          type="button"
                          id="button-minus"
                        >
                          {" "}
                          <i className="fa fa-plus" />{" "}
                        </button>
                      </div>
                    </div>{" "}
                    {/* input-group.// */}
                  </div>{" "}
                  {/* col.// */}
                </td>
                <td>
                  <div className="price-wrap">
                    <var className="price">$1156.00</var>
                    <small className="text-muted"> $315.20 each </small>
                  </div>{" "}
                  {/* price-wrap .// */}
                </td>
                <td className="text-right">
                  <a href="" className="btn btn-danger">
                    {" "}
                    Remove
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <figure className="itemside align-items-center">
                    <div className="aside">
                      <img src="./images/items/10.jpg" className="img-sm" />
                    </div>
                    <figcaption className="info">
                      <a href="#" className="title text-dark">
                        ADATA Premier ONE microSDXC
                      </a>
                      <p className="text-muted small">
                        Size: 256 GB <br /> Brand: ADATA{" "}
                      </p>
                    </figcaption>
                  </figure>
                </td>
                <td>
                  {/* col.// */}
                  <div className="col">
                    <div className="input-group input-spinner">
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-light"
                          type="button"
                          id="button-plus"
                        >
                          {" "}
                          <i className="fa fa-minus" />{" "}
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={1}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-light"
                          type="button"
                          id="button-minus"
                        >
                          {" "}
                          <i className="fa fa-plus" />{" "}
                        </button>
                      </div>
                    </div>{" "}
                    {/* input-group.// */}
                  </div>{" "}
                  {/* col.// */}
                </td>
                <td>
                  <div className="price-wrap">
                    <var className="price">$149.97</var>
                    <small className="text-muted"> $75.00 each </small>
                  </div>{" "}
                  {/* price-wrap .// */}
                </td>
                <td className="text-right">
                  <a href="" className="btn btn-danger">
                    {" "}
                    Remove
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <figure className="itemside align-items-center">
                    <div className="aside">
                      <img src="./images/items/9.jpg" className="img-sm" />
                    </div>
                    <figcaption className="info">
                      <a href="#" className="title text-dark">
                        Logitec headset for gaming
                      </a>
                      <p className="small text-muted">
                        Version: CUH-ZCT2E <br /> Brand: Sony
                      </p>
                    </figcaption>
                  </figure>
                </td>
                <td>
                  {/* col.// */}
                  <div className="col">
                    <div className="input-group input-spinner">
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-light"
                          type="button"
                          id="button-plus"
                        >
                          {" "}
                          <i className="fa fa-minus" />{" "}
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={1}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-light"
                          type="button"
                          id="button-minus"
                        >
                          {" "}
                          <i className="fa fa-plus" />{" "}
                        </button>
                      </div>
                    </div>{" "}
                    {/* input-group.// */}
                  </div>{" "}
                  {/* col.// */}
                </td>
                <td>
                  <div className="price-wrap">
                    <var className="price">$98.00</var>
                    <small className="text-muted"> $578.00 each</small>
                  </div>{" "}
                  {/* price-wrap .// */}
                </td>
                <td className="text-right">
                  <a href="" className="btn btn-danger">
                    {" "}
                    Remove
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>{" "}
        {/* card.// */}
      </aside>{" "}
      {/* col.// */}
      <aside className="col-lg-3">
        <div className="card">
          <div className="card-body">
            <dl className="dlist-align">
              <dt>Total price:</dt>
              <dd className="text-right">$69.97</dd>
            </dl>
            <dl className="dlist-align">
              <dt>Tax:</dt>
              <dd className="text-right"> $10.00</dd>
            </dl>
            <dl className="dlist-align">
              <dt>Total:</dt>
              <dd className="text-right text-dark b">
                <strong>$59.97</strong>
              </dd>
            </dl>
            <hr />
            <p className="text-center mb-3">
              <img src="./images/misc/payments.png" height={26} />
            </p>
            <a href="./place-order.html" className="btn btn-primary btn-block">
              {" "}
              Checkout{" "}
            </a>
            <a href="./store.html" className="btn btn-light btn-block">
              Continue Shopping
            </a>
          </div>{" "}
          {/* card-body.// */}
        </div>{" "}
        {/* card.// */}
      </aside>{" "}
      {/* col.// */}
    </div>{" "}
    {/* row.// */}
    {/* ============================ COMPONENT 1 END .// ================================= */}
  </div>{" "}
  {/* container .//  */}
</section>

    )
}