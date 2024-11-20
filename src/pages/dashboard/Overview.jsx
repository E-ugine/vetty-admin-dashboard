import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as Icons from "react-icons/tb";
import Bar from '../../charts/Bar.jsx';
import Area from '../../charts/Area.jsx';
import Badge from '../../components/common/Badge.jsx';
import Button from '../../components/common/Button.jsx';
import Profile from '../../components/common/Profile.jsx';

const Overview = () => {
	const[products, setProducts] = useState([]);

	useEffect(()=>{
	  fetch('https://vetty-backend-s1mr.onrender.com/products')
	  .then((r)=> r.json())
	  .then((data)=>{
		setProducts(data)
	  })
	},[])



	return (
		<section>
			<div className="container">
				<div className="wrapper">
					<div className="content">
						
				    <div className="content_item">
				    	<h2 className="sub_heading">
				    		<span>Sale Analytic</span>
				    		<Button
				    			label="Total Sale"
				    			className="sm"
				    		/>
				    	</h2>
				    	<Area/>
				    </div>
				    <div className="content_item">
				    	<h2 className="sub_heading">Best selling products</h2>
				    	<table className="simple">
							  <thead>
							    <tr>
							      <th>Name</th>
							      <th>Category</th>
							      <th>Price</th>
							      <th>Status</th>
							     
							    </tr>
							  </thead>
							  <tbody>
							    {products.map((product, key) => (
							      <tr key={key}>
							      	<td>
							      		<Profile 
							      			src={product.imageSrc}
							      			slogan={product.category}
							      			name={product.title}
							      		/>
							      	</td>
							        <td>{product.category}</td>
							        <td>Ksh.{product.price}</td>
							        
							      </tr>
							    ))}
							  </tbody>
							</table>
				    </div>
					</div>
					<div className="sidebar">
					
						<div className="sidebar_item">
							<h2 className="sub_heading">Order Recently</h2>
							<div className="recent_orders column">
								{
									products.map((product, key)=>(
										<Link key={key} to={`/orders/manage/${product.id}`} className="recent_order">
											<figure className="recent_order_img">
												<img src={product.imageSrc} alt=""/>
											</figure>
											<div className="recent_order_content">
												<h4 className="recent_order_title">{product.name}</h4>
												<p className="recent_order_category">{product.category}</p>
											</div>
											<div className="recent_order_details">
												<h5 className="recent_order_price">Ksh.{product.price}</h5>
												{/* <p className="recent_order_quantity">items: {product.inventory.quantity}</p> */}
											</div>
										</Link>
									))
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Overview