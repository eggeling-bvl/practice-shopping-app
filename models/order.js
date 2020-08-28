
class Order {
constructor(id,items,totalAmount,date){
    this.id=id;
    this.items=items;
    this.totalAmount=totalAmount;
    this.date=date;
}
get readableData(){
    return this.date.toLocaleDateString('de-DE',{
        year:'numeric',
        month:'long',
        day:'numeric',
        hour:'2-digit',
        minute:'2-digit'
    })
}

}

export default Order