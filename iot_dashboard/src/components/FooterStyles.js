import styled from 'styled-components';

export const Box = styled.div`
padding: 80px 60px;
background: green;
position: absolute;
bottom: 0;

width: 100%;


@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	width: 100%;
	height :50px;
	margin: 0 auto;
	background: gainsboro; 
	text-align: center;
`