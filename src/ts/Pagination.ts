module Post {
    export class Pagination {

        static id: string = "pagination";
        static href: string = null;
        static prev_id: string = "pagination_prev";
        static next_id: string = "pagination_next";

        static switchState(state: string) {
            document.getElementById(this.id).style.display = state;
        }
        static hide() {
            this.switchState("none");
        }

        static show() {
            this.switchState("");
        }

        static setHrefPage(href: string) {
            this.href = href;
        }

        static setPage(page: number, max: number) {

            var prevBtn = $("#" + this.prev_id)
            var nextBtn = $("#" + this.next_id)

            if ((Number(page) - 1) <= 0)
                prevBtn.addClass("disabled");
            else
                prevBtn.removeClass("disabled");

            if ((Number(page) + 1) > max)
                nextBtn.addClass("disabled");
            else
                nextBtn.removeClass("disabled");


            prevBtn.attr("href", this.href + "/" + (page - 1));
            nextBtn.attr("href", this.href + "/" + (Number(page) + 1));

        }

    }
}