export default function OrderComplete({}){
    return(
        <>
  <div className="container" style={{ marginTop: 50 }}>
    <center>
      <i
        className="fas fa-check-circle"
        style={{ fontSize: 72, marginBottom: 20, color: "#28A745" }}
      />
    </center>
    <h2 className="text-center">Payment Successful</h2>
    <br />
    <div className="text-center">
      <a href="{% url 'store' %}" className="btn btn-success">
        Shop more
      </a>
    </div>
  </div>
  <div
    className="container"
    style={{
      margin: "0 auto",
      width: "50%",
      padding: 50,
      background: "#f1f1f1",
      marginTop: 50,
      marginBottom: 50
    }}
  >
    <div className="row invoice row-printable">
      <div className="col-md-12">
        {/* col-lg-12 start here */}
        <div className="panel panel-default plain" id="dash_0">
          {/* Start .panel */}
          <div className="panel-body p30">
            <div className="row">
              {/* Start .row */}
              <div className="col-lg-6">
                {/* col-lg-6 start here */}
                <div className="invoice-logo">
                  <img
                    src="/images/logo.png"
                    alt="Invoice logo"
                    style={{ maxHeight: 40 }}
                  />
                </div>
              </div>
              {/* col-lg-6 end here */}
              <div className="col-lg-6">
                {/* col-lg-6 start here */}
                <div className="invoice-from">
                  <ul className="list-unstyled text-right">
                    <li>
                      <strong>Invoiced To</strong>
                    </li>
                    <li>Jakob Smith</li>
                    <li>Roupark 37</li>
                    <li>New York, NY, 2014</li>
                    <li>USA</li>
                  </ul>
                </div>
              </div>
              {/* col-lg-6 end here */}
              <div className="col-lg-12">
                {/* col-lg-12 start here */}
                <div className="invoice-details mt25">
                  <div className="well">
                    <ul className="list-unstyled mb0">
                      <li>
                        <strong>Order</strong> #
                      </li>
                      <li>
                        <strong>Transaction</strong> #
                      </li>
                      <li>
                        <strong>Order Date:</strong> Monday, October 10th, 2015
                      </li>
                      <li>
                        <strong>Status:</strong> PAID
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="invoice-items">
                  <div
                    className="table-responsive"
                    style={{ overflow: "hidden", outline: "none" }}
                    tabIndex={0}
                  >
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="per70 text-center">Description</th>
                          <th className="per5 text-center">Qty</th>
                          <th className="per25 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            1024MB Cloud 2.0 Server - elisium.dynamic.com
                            (12/04/2014 - 01/03/2015)
                          </td>
                          <td className="text-center">1</td>
                          <td className="text-center">$25.00 USD</td>
                        </tr>
                        <tr>
                          <td>Logo design</td>
                          <td className="text-center">1</td>
                          <td className="text-center">$200.00 USD</td>
                        </tr>
                        <tr>
                          <td>
                            Backup - 1024MB Cloud 2.0 Server -
                            elisium.dynamic.com
                          </td>
                          <td className="text-center">12</td>
                          <td className="text-center">$12.00 USD</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan={2} className="text-right">
                            Sub Total:
                          </th>
                          <th className="text-center">$237.00 USD</th>
                        </tr>
                        <tr>
                          <th colSpan={2} className="text-right">
                            Tax:
                          </th>
                          <th className="text-center">$47.40 USD</th>
                        </tr>
                        <tr>
                          <th colSpan={2} className="text-right">
                            Grand Total:
                          </th>
                          <th className="text-center">$284.4.40 USD</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="invoice-footer mt25">
                  <p className="text-center">Thank you for shopping with us!</p>
                </div>
              </div>
              {/* col-lg-12 end here */}
            </div>
            {/* End .row */}
          </div>
        </div>
        {/* End .panel */}
      </div>
      {/* col-lg-12 end here */}
    </div>
  </div>
</>

    )
}