import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, boxes}) =>{
	return(
		<div className="center ma">
			<div className="absolute mt2">
				<img id="inputImage" alt=""src={imageUrl}  width='500px' height="auto" />
				{	
					boxes.map((box, i) => {
						const { topRow, rightCol, bottomRow, leftCol } = box;
						return (<div id='face' key={i} style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol }}  className="box" ></div>)
					})
				}
			</div>	
		</div>
	);
}

export default FaceRecognition;
