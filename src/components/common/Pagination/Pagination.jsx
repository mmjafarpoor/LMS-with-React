import ReactPaginate from "react-paginate";
import Style from './Pagination.module.css'

const Pagination = ({
    pageCount,
    pageIndex,
    onPageChange,
    }) => {
    return (
        <ReactPaginate
            previousLabel={
                <span className={Style.prevPaginationIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                </span>
            }
            breakLabel="..."
            nextLabel={
                <span className={Style.nextPaginationIcon}>
                <svg style={{ transform: 'scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                </span>
            }
            pageCount={pageCount}
            onPageChange={onPageChange}
            forcePage={pageIndex}
            containerClassName={Style.paginationContainer}
            pageClassName={Style.pageItem}
            pageLinkClassName="block"
            previousLinkClassName="block"
            nextLinkClassName="block"
            activeClassName={Style.activePageItem}
            disabledClassName={Style.disabledArrow}
            previousClassName={Style.paginationButton}
            nextClassName={Style.paginationButton}
        />
    );
};

export default Pagination;