import React from "react";
import { useAuth } from "../data/hooks/useAuth";

function Home() {
  const { user } = useAuth();
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">Laravel React Auth</div>
          <div className="card-body">
            {
              user && (
                <>
                  <p>Signed in</p>
                  <div>Hi {user.name}</div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home