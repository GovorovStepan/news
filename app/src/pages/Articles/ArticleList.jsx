import React from "react";
import { useAuth } from "../../data/hooks/useAuth";

function ArticleList() {
  const { user } = useAuth();
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">ArticleList</div>
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


export default ArticleList