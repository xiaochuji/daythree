require.config({
    paths:{
        'swiper':"./swiper",
        'fle':"./flexible",
        "jquery":"./jquery-3.3.1"
    }
})
require(['swiper','fle',"jquery"],function(Swiper,fle,$){
    var mySwiper = new Swiper(".swiper-content",{
        autoplay:true,
        loop:true
    })
    $.ajax({
        url:"/api/file",
        dataType:"json",
        success:function(data){
            var html = "";
            data.data.forEach(function(val){
                html += `<dl>
                            <dt>
                                <img src="${val.img}" alt="">
                            </dt>
                            <dd>
                                <ul>
                                    <li>
                                        <h4>
                                            ${val.content}
                                        </h4>
                                    </li>
                                    <li>
                                        <dl>
                                            <dt>规格：${val.size}</dt>
                                            <dd>${val.page}</dd>
                                        </dl>
                                        <div>+</div>
                                    </li>
                                </ul>
                            </dd>
                        </dl>`
            })
            count.innerHTML = html
        }
    })
})