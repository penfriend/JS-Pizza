/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $(".order-items");
var $lable_count = $(".order-lable-count");
var $total_sum = $(".order-total-sum-value"); 

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    //Приклад реалізації, можна робити будь-яким іншим способом
    var node = {
            pizza: pizza,
            size: size,
            quantity: 1
        };
    
    if(isUnique(node)){
        Cart.push(node);
    }else{
        Cart[Cart.indexOf(node)].quantity+=1;
    }
    //Оновити вміст кошика на сторінці
    updateCart();
}


 function isUnique (cart_item){
     Cart.forEach(function(v){
         if(v.pizza==cart_item.pizza && v.size==cart_item.size){
      
             return false;
         }
     });
     
     return true;
 } 

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
     var i = parseInt(Cart.indexOf(cart_item));
    Cart.splice(i,1);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function totalSum(){
    var res=0;
    Cart.forEach(function(v){
        res += parseInt(v.pizza[v.size].price)*parseInt(v.quantity);
    });
    return res;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
     $lable_count.text(Cart.length);
        $total_sum.text(totalSum);
    
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem({item : cart_item});
        
        var $node = $(html_code);
        
        $node.find(".order-item-amount-price-value").text(cart_item.quantity * cart_item.pizza[cart_item.size].price);
        
        $node.find(".order-item-plus-btn").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        
        $node.find(".order-item-minus-btn").click(function(){
            cart_item.quantity -= 1;
            
            if(cart_item.quantity<=0) removeFromCart(cart_item);
            
            updateCart();
        });
        
        $node.find(".order-item-amount-remove-btn").click(function(){
            removeFromCart(cart_item);
            
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;