export const searchItems = async (items, query) => {
  // Convert query to lowercase for case-insensitive search
  const searchQuery = query.toLowerCase();
  
  // Search through items
  return items.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(searchQuery);
    const typeMatch = item.type.toLowerCase().includes(searchQuery);
    return titleMatch || typeMatch;
  });
};