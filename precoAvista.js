{
    var valor = 
    $('.skuPrice').html().trim().replace('R$', '').replace('.', '').replace(',', '.') - $('.skuPrice').html().trim().replace('R$', '').replace('.', '').replace(',', '.') * 5 / 100
    $('.productPrice').prepend('<span class="price-desconto">' + valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + '</span><span style="color: #444444;font-size: 15px;font-weight: 600;"> à vista ou</span>');
}