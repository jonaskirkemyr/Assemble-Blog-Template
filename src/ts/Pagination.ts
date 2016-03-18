module Post {
    export class Pagination {

        static id: string = "pagination";
        static prev_id:string="pagination_prev";
        static next_id:string="pagination_next";

        static switchState(state: string) {
            document.getElementById(this.id).style.display = state;
        }
        static hide() {
            this.switchState("none");
        }

        static show() {
            this.switchState("");
        }
        
        static setPage(page:number,max:number){
            
            var prevBtn=$("#"+this.prev_id)
            var nextBtn=$("#"+this.next_id)
            if((page-1)<0)
            prevBtn.addClass("disabled");
            
            if((page+1)>max)
            nextBtn.addClass("disabled");

            prevBtn.attr("href","#"+(page-1));
            nextBtn.attr("href","#"+(page+1));
                
        }
        
    }
}