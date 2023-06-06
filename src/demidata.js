import sofa from "./assets/sofa.png"
import chair1 from "./assets/chair1.png"
import chair2 from "./assets/chair2.png"
import bed from "./assets/bed.jpg"
import chair from "./assets/chairscat.jpg"
import table from "./assets/table.jpg"
import office from "./assets/office.jpg"
import sofa1 from "./assets/sofa.jpg"
import bedroom from "./assets/bedroom.jpg"

export const demiProducts=[
    {
      title : "Trending Products",
      products:[
        {
          _id : 1,
          name:"A Chair",
          price:400,
          stars:5,
          category:"Chairs",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
        {
          _id : 2,
          name:"Another Chair",
          price:480,
          stars:2.7,
          category:"Chairs",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
        {
          _id : 3,
          name:"One More Chair",
          price:430,
          stars:1.2,
          category:"Chairs",
  
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
        {
          _id : 4,
          name:"Guess what? A Chairfoielriojgiopefjeiojrpfj",
          price:900,
          stars:4.4,
          category:"Chairs",
  
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
        {
          _id : 9,
          name:"A Chair",
          price:400,
          stars:5,
          category:"Chairs",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
      ]
    },
    {
      title : "Featured Products",
      products:[
        {
          _id : 5,
          name:"A Bed",
          price:400,
          stars:3.3,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
        {
          _id : 6,
          name:"Another Bed",
          price:480,
          stars:5,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
        {
          _id : 7,
          name:"One More Bed",
          price:430,
          stars:0,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
        {
          _id : 8,
          name:"Guess what? A Bed",
          price:900,
          stars:3,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
        {
          _id : 10,
          name:"Guess what? A Bed",
          price:900,
          stars:3,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
      ]
    }
  ]

  
  export const categoryData = [
    {
        id:0,
        name:"Bedroom Furniture",
        img:bed,
        gridLoc:"row-span-1 row-start-1"
    },
    {
        id:1,
        name:"Chairs",
        img:chair,
        gridLoc:"row-span-1 row-start-2"
    },{
        id:2,
        name:"Tables",
        img:table,
        gridLoc:"row-span-2 col-start-2"
    },{
        id:3,
        name:"Office Furniture",
        img:office,
        gridLoc:"col-span-2 row-start-3 md:row-start-1 md:col-start-3"
    },{
        id:4,
        name:"Sofas",
        img:sofa1,
        gridLoc:"col-start-1 row-start-4 md:col-start-3 md:row-start-2"
    },{
        id:5,
        name:"Bedroom Furniture",
        img:bedroom,
        gridLoc:"col-start-2 row-start-4 md:col-start-4 md:row-start-2"
    },
]

export const sliderItems = [
  {
      id:1,
      img: sofa,
      title:"WINTER CLEARANCE",
      desc: "WHY WAIT WHEN YOU CAN GET ANY THING IN ONE CLICK. NEVER COMPROMISE!",
      bg:'f5fafd',
      circleCol:"95c1db"

  },
  {
      id:2,
      img: chair1,
      title:"SUMMER SALE",
      desc: "WHY WAIT WHEN YOU CAN GET ANY THING IN ONE CLICK. NEVER COMPROMISE!",
      bg:'fcf1ed',
      circleCol:"f5ab90"
  },
  {
      id:3,
      img: chair2,
      title:"SPRING ARRIVALS",
      desc: "WHY WAIT WHEN YOU CAN GET ANY THING IN ONE CLICK. NEVER COMPROMISE!",
      bg:'fbf0f4',
      circleCol:"e6779f"

  }
]
