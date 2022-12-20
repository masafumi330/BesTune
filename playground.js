let items = [
    { name: 'どうのつるぎ', price: 150 },
    { name: 'かわのたて', price: 80 },
    { name: 'かわのぼうし', price: 100 },
]

const priceList = [];
for (var item of items) {
    priceList.push(item.price);
}

console.log(priceList);

// items.forEach(function (item, index) {
//     console.log(index)
//     console.log(item.name)
//     console.log(item.price)
// })
