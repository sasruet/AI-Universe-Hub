function loadAI(dataLimit) {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => displayAI(data.data.tools, dataLimit));
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

function displayAI(cards, dataLimit) {
    const aIContainer = document.getElementById('container');
    aIContainer.textContent = '';
    document.getElementById('short-by-date').addEventListener('click',function () {
        cards.sort(function compare(a, b) {
            const dateA = new Date(a.published_in);
            const dateB = new Date(b.published_in);
           return dateA - dateB;
          });
         displayAI(cards);
    });
    const showAll = document.getElementById('show-all');
    if(dataLimit && cards.length > 6) {
        cards = cards.slice(0, 6);
        showAll.classList.remove('d-none');
        
    }
    else{
        showAll.classList.add('d-none');
       
    }
    
    cards.forEach(card => {
        const aIDiv = document.createElement('div');
        aIDiv.classList.add('col');
        aIDiv.innerHTML = `
        <div class="card" style="">
        <div class="p-3"> <img src="${card.image
     }" class="card-img-top rounded" style="height:300px;"></div>
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text">
            <ol class="p-3">
                <li>${card.features[0]} </li>
                <li> ${card.features[1]} </li>
                <li> ${card.features[2] ? card.features[2]:"Not found"} </li>
            </ol>
            </p>
            <hr>
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <h5 class="card-title">${card.name}</h5>
                    <span><i class="fa fa-light fa-calendar" style="color: #eb5757;">
                        </i>
                    </span>
                    <span>${card.published_in} </span></div>
                    <div><button onclick="loadAIDetails('${card.id}')" href="#" class="btn-info" data-bs-toggle="modal"
                            data-bs-target="#AIDetailModal"><i class="fa fa-solid fa-arrow-right fa-2xl"
                                style="color: #eb5757;"></i></button>
                    </div>
                

            </div>`;
        aIContainer.appendChild(aIDiv);
    });
    toggleSpinner(false);

};


const processSearch = (dataLimit) =>{
    loadAI(dataLimit);
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})


const loadAIDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAIDetails(data.data);
}

const displayAIDetails = AI => {
    const AIDetails = document.getElementById('AI-details');
    console.log();
    AIDetails.innerHTML = `
    <div class="row px-4 gap-2 pt-5 pb-5">
    <div class="col-lg border border-danger rounded" style="background-color:rgba(235, 87, 87, 0.05); "> <h4> ${AI.description}</h4>
   
    <div class="row gap-2 mx-auto mb-3">
    <div class="text-success col rounded bg-white">
    <a href=""><p>${AI.pricing[0].price ? AI.pricing[0].price:"Free of cost"}
   <br> ${AI.pricing[0].plan} </p></a>
    
    </div>
    <div class="text-primary col rounded bg-white"> <a href=""><p>${AI.pricing[1].price ? AI.pricing[1].price:"Free of cost"} <br> ${AI.pricing[1].plan} </p></a>
    </div>
    <div class="text-danger col rounded bg-white">
    <a href=""><p>${AI.pricing[2].price ? AI.pricing[2].price:"Free of cost"} <br>
    ${AI.pricing[2].plan} </p></a></div></div>
    <div class="d-flex" >
    <div><h4>Features</h4>
        <ol>
            <li>${AI.features[1].feature_name} </li>
            <li>${AI.features[2].feature_name} </li>
            <li>${AI.features[3].feature_name ? AI.features[3].feature_name: "Not found"} </li>
        </ol>
    </div>
    <div><h4>Integrations</h4>
    <ul>
        <li>${AI.integrations[0]}</li>
        <li>${AI.integrations[1]}</li>
        <li>${AI.integrations[2] ? AI.integrations[2]:"Not data found"}</li>
    </ul></div>
</div>
    </div>
    <div class="col-lg border p-2 rounded position-relative"><div class="position-absolute top-0 end-0 my-3 mx-3 bg-danger rounded text-white px-3">${AI.accuracy.score ? AI.accuracy.score * 100 + "% accuracy": "" }</div>
    
    <img src="${AI.image_link[0]
    }" class="img-fluid rounded">
    <h4>${AI.input_output_examples[0].input}</h4>
    <p style="color:#585858;">${AI.input_output_examples[0].output ? AI.input_output_examples[0].output:"No! Not Yet! Take a break!!!"}</p>
    </div>
    </div>
    `;

};

loadAI();
toggleSpinner(true);
processSearch(6);
