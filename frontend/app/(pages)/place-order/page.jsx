export default function PlaceOrder({}){
    return(
        <section className="section-content padding-y bg">
  <div className="container">
    {/* ============================ COMPONENT 2 ================================= */}
    <div className="row">
      <main className="col-md-8">
        <article className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-4">Review cart</h4>
            <div className="row">
              <div className="col-md-6">
                <figure className="itemside  mb-4">
                  <div className="aside">
                    <img src="./images/items/1.jpg" className="border img-sm" />
                  </div>
                  <figcaption className="info">
                    <p>Apple iPad (2019) 32Gb Wi-Fi gold </p>
                    <span className="text-muted">2x = $560 </span>
                  </figcaption>
                </figure>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-6">
                <figure className="itemside  mb-4">
                  <div className="aside">
                    <img src="./images/items/2.jpg" className="border img-sm" />
                  </div>
                  <figcaption className="info">
                    <p>Apple iPad (2019) 32Gb Wi-Fi gold </p>
                    <span className="text-muted">2x = $560 </span>
                  </figcaption>
                </figure>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-6">
                <figure className="itemside mb-4">
                  <div className="aside">
                    <img src="./images/items/3.jpg" className="border img-sm" />
                  </div>
                  <figcaption className="info">
                    <p>Apple iPad (2019) 32Gb Wi-Fi gold </p>
                    <span className="text-muted">2x = $560 </span>
                  </figcaption>
                </figure>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-6">
                <figure className="itemside  mb-4">
                  <div className="aside">
                    <img src="./images/items/4.jpg" className="border img-sm" />
                  </div>
                  <figcaption className="info">
                    <p>Apple iPad (2019) 32Gb Wi-Fi gold </p>
                    <span className="text-muted">2x = $560 </span>
                  </figcaption>
                </figure>
              </div>{" "}
              {/* col.// */}
            </div>{" "}
            {/* row.// */}
          </div>{" "}
          {/* card-body.// */}
        </article>{" "}
        {/* card.// */}
        <article className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-4">Contact info</h4>
            <form action="">
              <div className="row">
                <div className="form-group col-sm-6">
                  <label>Frst name</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label>Phone</label>
                  <input
                    type="text"
                    defaultValue={+998}
                    className="form-control"
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="form-control"
                  />
                </div>
              </div>{" "}
              {/* row.// */}
            </form>
          </div>{" "}
          {/* card-body.// */}
        </article>{" "}
        {/* card.// */}
        <article className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-4">Delivery info</h4>
            <form action="">
              <div className="row">
                <div className="form-group col-sm-6">
                  <label>Country*</label>
                  <select name="" className="form-control">
                    <option value="">India</option>
                    <option value="">United States</option>
                    <option value="">France</option>
                    <option value="">Italy</option>
                  </select>
                </div>
                <div className="form-group col-sm-6">
                  <label>State*</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-sm-8">
                  <label>Street*</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label>Building</label>
                  <input type="text" placeholder="" className="form-control" />
                </div>
                <div className="form-group col-sm-4">
                  <label>House</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label>Postal code</label>
                  <input type="text" placeholder="" className="form-control" />
                </div>
                <div className="form-group col-sm-4">
                  <label>Zip</label>
                  <input type="text" placeholder="" className="form-control" />
                </div>
              </div>{" "}
              {/* row.// */}
            </form>
          </div>{" "}
          {/* card-body.// */}
        </article>{" "}
        {/* card.// */}
        <article className="accordion" id="accordion_pay">
          <div className="card">
            <header className="card-header">
              <img
                src="./images/misc/payment-paypal.png"
                className="float-right"
                height={24}
              />
              <label
                className="form-check collapsed"
                data-toggle="collapse"
                data-target="#pay_paynet"
              >
                <input
                  className="form-check-input"
                  name="payment-option"
                  defaultChecked=""
                  type="radio"
                  defaultValue="option2"
                />
                <h6 className="form-check-label">Paypal</h6>
              </label>
            </header>
            <div
              id="pay_paynet"
              className="collapse show"
              data-parent="#accordion_pay"
            >
              <div className="card-body">
                <p className="text-center text-muted">
                  Connect your PayPal account and use it to pay your bills.
                  You'll be redirected to PayPal to add your billing
                  information.
                </p>
                <p className="text-center">
                  <a href="#">
                    <img src="./images/misc/btn-paypal.png" height={32} />
                  </a>
                  <br />
                  <br />
                </p>
              </div>{" "}
              {/* card body .// */}
            </div>{" "}
            {/* collapse .// */}
          </div>{" "}
          {/* card.// */}
          <div className="card">
            <header className="card-header">
              <img
                src="./images/misc/payment-card.png"
                className="float-right"
                height={24}
              />
              <label
                className="form-check"
                data-toggle="collapse"
                data-target="#pay_payme"
              >
                <input
                  className="form-check-input"
                  name="payment-option"
                  type="radio"
                  defaultValue="option2"
                />
                <h6 className="form-check-label"> Credit Card</h6>
              </label>
            </header>
            <div
              id="pay_payme"
              className="collapse"
              data-parent="#accordion_pay"
            >
              <div className="card-body">
                <p className="alert alert-success">
                  Some information or instruction
                </p>
                <form className="form-inline">
                  <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    name=""
                  />
                  <input
                    type="text"
                    className="form-control mr-2"
                    style={{ width: 100 }}
                    placeholder="dd/yy"
                    name=""
                  />
                  <input
                    type="number"
                    maxLength={3}
                    className="form-control mr-2"
                    style={{ width: 100 }}
                    placeholder="cvc"
                    name=""
                  />
                  <button className="btn btn btn-success">Button</button>
                </form>
              </div>{" "}
              {/* card body .// */}
            </div>{" "}
            {/* collapse .// */}
          </div>{" "}
          {/* card.// */}
        </article>
        {/* accordion end.// */}
      </main>{" "}
      {/* col.// */}
      <aside className="col-md-4">
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
              Place Order{" "}
            </a>
          </div>{" "}
          {/* card-body.// */}
        </div>{" "}
        {/* card.// */}
      </aside>{" "}
      {/* col.// */}
    </div>{" "}
    {/* row.// */}
    {/* ============================ COMPONENT 2 END//  ================================= */}
  </div>{" "}
  {/* container .//  */}
</section>

    )
}