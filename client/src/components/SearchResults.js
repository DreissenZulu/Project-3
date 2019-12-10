import React from 'react';

function SearchResults(props) {
	return (
		<div className="row">
			{props.results.map(post => {
				return (
					<div className="col-md-6 card">
						<div className="row no-gutters">
							<div class="col-md-4">
								<img src={"https://" + post.company.logo.split("https://")[2]} class="card-img" alt="..." />
							</div>
							<div className="col-md-8">
								<div className="card-body">
									<h5 className="card-title">{post.title}</h5>
									<p>{post.company.name}</p>
									<small class="text-muted">Posted {post.post_date}</small>
									<p>
										{post.category.name} - {post.type.name}
									</p>
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default SearchResults;