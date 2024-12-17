export const paginateData = (items, currentPage, itemsPerPage) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
        paginatedItems: items.slice(startIndex, endIndex),
        totalPages,
    };
};

export const createPaginationControls = (
    container,
    currentPage,
    totalPages,
    onPageChange
) => {
    container.innerHTML = "";
    const ul = document.createElement("ul");
    ul.className = "pagination justify-content-center mt-4";

    const addButton = (label, page, isEnabled) => {
        const li = document.createElement("li");
        li.className = `page-item ${isEnabled ? "" : "disabled"}`;
        li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
        if (isEnabled) li.addEventListener("click", () => onPageChange(page));
        ul.appendChild(li);
    };

    // כפתורים של התחלה והקודם
    addButton("&laquo;", 1, currentPage > 1);
    addButton("&lsaquo;", currentPage - 1, currentPage > 1);

    // הצגת מספר עמודים בודדים בלבד
    const maxPagesToShow = 5; // מספר העמודים שיוצגו סביב העמוד הנוכחי
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // תיקון לטווח אם אנחנו בסוף העמודים
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // יצירת כפתורי העמודים
    for (let i = startPage; i <= endPage; i++) {
        addButton(i, i, i !== currentPage);
    }

    // כפתורים של הבא והסוף
    addButton("&rsaquo;", currentPage + 1, currentPage < totalPages);
    addButton("&raquo;", totalPages, currentPage < totalPages);

    container.appendChild(ul);
};
