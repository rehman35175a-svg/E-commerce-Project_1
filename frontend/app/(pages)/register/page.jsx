export default function Register({}){
    return(
        <section className="section-content padding-y">
  {/* ============================ COMPONENT REGISTER   ================================= */}
  <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
    <article className="card-body">
      <header className="mb-4">
        <h4 className="card-title">Sign up</h4>
      </header>
      <form>
        <div className="form-row">
          <div className="col form-group">
            <label>First name</label>
            <input type="text" className="form-control" placeholder="" />
          </div>{" "}
          {/* form-group end.// */}
          <div className="col form-group">
            <label>Last name</label>
            <input type="text" className="form-control" placeholder="" />
          </div>{" "}
          {/* form-group end.// */}
        </div>{" "}
        {/* form-row end.// */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="" />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>{" "}
        {/* form-group end.// */}
        <div className="form-group">
          <label className="custom-control custom-radio custom-control-inline">
            <input
              className="custom-control-input"
              defaultChecked=""
              type="radio"
              name="gender"
              defaultValue="option1"
            />
            <span className="custom-control-label"> Male </span>
          </label>
          <label className="custom-control custom-radio custom-control-inline">
            <input
              className="custom-control-input"
              type="radio"
              name="gender"
              defaultValue="option2"
            />
            <span className="custom-control-label"> Female </span>
          </label>
        </div>{" "}
        {/* form-group end.// */}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>City</label>
            <input type="text" className="form-control" />
          </div>{" "}
          {/* form-group end.// */}
          <div className="form-group col-md-6">
            <label>Country</label>
            <select id="inputState" className="form-control">
              <option> Choose...</option>
              <option>Uzbekistan</option>
              <option>Russia</option>
              <option selected="pass">United States</option>
              <option>India</option>
              <option>Afganistan</option>
            </select>
          </div>{" "}
          {/* form-group end.// */}
        </div>{" "}
        {/* form-row.// */}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Create password</label>
            <input className="form-control" type="password" />
          </div>{" "}
          {/* form-group end.// */}
          <div className="form-group col-md-6">
            <label>Repeat password</label>
            <input className="form-control" type="password" />
          </div>{" "}
          {/* form-group end.// */}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            {" "}
            Register
          </button>
        </div>{" "}
        {/* form-group// */}
      </form>
    </article>
    {/* card-body.// */}
  </div>{" "}
  {/* card .// */}
  <p className="text-center mt-4">
    Have an account? <a href="">Log In</a>
  </p>
  <br />
  <br />
  {/* ============================ COMPONENT REGISTER  END.// ================================= */}
</section>

    )
}