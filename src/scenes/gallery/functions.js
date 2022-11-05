const allTagsGenerator = ({items}) => {
  const tags = items.map(item => item.tags).flat()
  const tagData = tags.reduce(function(prev, current) {
    prev[current] = (prev[current] || 0) + 1;
    return prev;
  }, {})
  const set = new Set(tags)
  const newArr = [...set]
  const res = newArr.map(item => {
    return {
      label: item,
      count: tagData[item]
    }
  })
  const result = res.sort((a, b) => b.count - a.count);
  return result
}

const photoIndexGenerator = ({ref, count, photoData}) => {
  const photoIndex = [...Array(count)].map((_, i) => {
    const targetData = photoData.find((v) => v.id === i)
    return {
      index: i,
      source: `https://kiyohken2000.web.fc2.com/${ref}/${i}.jpg`,
      id: targetData?targetData.id:i,
      tags: targetData?targetData.tags:[],
      like: targetData?.like?targetData.like:0
    }
  })
  return photoIndex
}

const filterPhotoWithTag = ({tag, photoIndexArray}) => {
  const res = photoIndexArray.filter((v) => v.tags.includes(tag.label))
  const result = res.map((item, i) => {
    return {
      ...item,
      index: i
    }
  })
  return result
}

const filterTagWithInput = ({allTags, input}) => {
  const res = allTags.filter((v) => v.label.includes(input))
  return res
}

const likeSort = ({photoIndexArray}) => {
  const res = photoIndexArray.sort((a, b) => b.like - a.like);
  return res
}

const idSort = ({photoIndexArray}) => {
  const res = photoIndexArray.sort((a, b) => a.id - b.id);
  return res
}

export { allTagsGenerator, photoIndexGenerator, filterPhotoWithTag, filterTagWithInput, likeSort, idSort }