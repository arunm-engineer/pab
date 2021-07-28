import { couponCollections } from '../Data/data';

let initialState = {
    items: [],
    totalPrice: 0
}

export default function cartReducer(state = initialState, action) {
    let items;
    let totalPrice;

    switch (action.type) {
        case "add_item":
            return { items, totalPrice } = processToAddItems(state.items, action.selectedItem)
        case "remove_item":
            return { items, totalPrice } = processToRemoveItems(state.items, action.selectedItem)
        case "quantity_variation":
            return { items, totalPrice } = processToItemQuantityVaraition(state.items, action.selectedItem, action.value)
        case "apply_coupon":
            totalPrice = applyCoupon(state.totalPrice, action.coupon);
            items = state.items;
            return { items, totalPrice };
        default:
            return state;
    }
}

function processToAddItems(items, newItem) {
    let findItem;
    items.forEach(item => {
        if (item.title === newItem.title) findItem = item;
    })

    if (findItem) return { items, totalPrice };
    
    newItem.quantity = 1;
    items = [...items, newItem];
    let totalPrice = getTotalPrice(items);
    return { items, totalPrice };
}

function processToRemoveItems(items, selectedItem) {
    items = items.filter(item => {
        return item.title !== selectedItem.title;
    })

    let totalPrice = getTotalPrice(items);

    return { items, totalPrice };

}

function processToItemQuantityVaraition(items, selectedItem, value) {
    items = items.map(item => {
        if (item.title === selectedItem.title) item.quantity = value;
        return item;
    })

    let totalPrice = getTotalPrice(items);

    return { items, totalPrice };
}

function getTotalPrice(items) {
    let totalPrice = 0;

    items.forEach(item => {
        totalPrice += Number(item.price) * Number(item.quantity);
    })

    return totalPrice;
}

function applyCoupon(totalPrice, coupon) {
    let extractedCoupon = couponCollections[coupon];
    if (extractedCoupon) totalPrice *= ((100 - extractedCoupon.discount)/100);

    return Number.parseInt(totalPrice);
}