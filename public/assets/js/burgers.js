const undevouredTemplate = (burger) => (`
<div id="undevoured-${burger.id}" class="input-group">
    <input class="input-group-field undevoured" disabled type="text" value="${burger.name}">
    <div class="input-group-button">
        <button type="button" class="button devour" value="${burger.id}">Devour</button>
    </div>
</div>
`);

const devouredTemplate = (burger) => (`
<li id="devoured-${burger.id}">${burger.name}</li>
`);

function addABurger(event) {
    event.preventDefault()
    const burgerInput = $('#burgerInput').val()
    if (!burgerInput.trim()) {
        console.log("No Burger Entered");
        return;
    }
    console.log(burgerInput);

    $.post("/burgers", {
        name: burgerInput
    }).done((data) => {
        $(".burger.delicious").append(undevouredTemplate(data));
    }).fail((error) => {
        console.log(error);
    });
}

function devourABurger(event) {
    const burgerIdToDevour = $(event.currentTarget).val();
    console.log(burgerIdToDevour);
    $.ajax(`/burgers/${burgerIdToDevour}`, { method: "PUT" })
    .done((data) => {
        $(`#undevoured-${data.id}`).remove();
        $(".burger.devoured").append(devouredTemplate(data));
    }).fail((error) => {
        console.log(error);
    });
}

$("#addBurgerBtn").on("click", addABurger);
$(".burger.delicious").on("click", ".button.devour", devourABurger)