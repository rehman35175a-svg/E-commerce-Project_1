export default function SignIn({}){
    return(
        <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
  {/* ============================ COMPONENT LOGIN   ================================= */}
  <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
    <div className="card-body">
      <h4 className="card-title mb-4">Sign in</h4>
      <form>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
          />
        </div>{" "}
        {/* form-group// */}
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>{" "}
        {/* form-group// */}
        <div className="form-group">
          <a href="#" className="float-right">
            Forgot password?
          </a>
        </div>{" "}
        {/* form-group form-check .// */}
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            {" "}
            Login
          </button>
        </div>{" "}
        {/* form-group// */}
      </form>
    </div>{" "}
    {/* card-body.// */}
  </div>{" "}
  {/* card .// */}
  <p className="text-center mt-4">
    Don't have account? <a href="#">Sign up</a>
  </p>
  <br />
  <br />
  {/* ============================ COMPONENT LOGIN  END.// ================================= */}
</section>

    )
}