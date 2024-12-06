import PropTypes from "prop-types";

const Tags = ({item, handleDeleteTag, isTagDel}) => {

  const tags = JSON.parse(item.request.tags)

  return (
    <>
      {(tags.length > 0)
        ? <ul className='flex flex-wrap text-sm leading-5 gap-2 pt-3 pb-2'>
            {
              tags.map(tag => (
                isTagDel 
                  ? <li key={item.id + '-' + tag} title="Press to delete" className='bg-gray-400 px-2 rounded hover:opacity-80 cursor-pointer' onClick={() => handleDeleteTag(tag)}>{tag}</li>
                  : <li key={item.id + '-' + tag} className='bg-gray-400 px-2 rounded cursor-default'>{tag}</li>
              ))
            }
          </ul>
        : ''
      }
    </>
  );
};

Tags.propTypes = {
  item: PropTypes.object,
  handleDeleteTag: PropTypes.func,
  isTagDel: PropTypes.bool
};

export default Tags;
