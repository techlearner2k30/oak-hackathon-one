import Hero from './components/hero'
import HomePromo from './components/homepromo'
import HomeFeaturedProducts from './components/homefeaturedproducts'

const productsList = [
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
  { imgUrl : 'feature.png' , title :  "Brushed Raglan Sweatshirt", price : 195 },
]

export default function Home() {
  return (
  <>
      <Hero />

      <HomePromo productsList={productsList.slice(0,2)} />

      <HomeFeaturedProducts productsList={productsList.slice(0,3)}/>

    </>
  )
}
