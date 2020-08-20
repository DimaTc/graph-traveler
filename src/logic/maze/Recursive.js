/*
buggy implementation of the recursive generator, didn't take to account the walls and some more parameters
The code is NOT in used, kept it for future reference if needed

!DON'T USE OR JUDGE BASED ON THIS CODE, THIS IS AN EARLY PROTOTYPING
*/
export default function (graphData, generationData) {
  let { start, goal, vertices, walls, data } = graphData;
  let { queue, running, extraParams } = generationData;
  let { vertical, nodeQueue, r_start, r_end, width, height, firstNode, totalWidth, totalHeight } = extraParams;
  //   if (nodeQueue !== undefined) console.log([...nodeQueue]);
  if (nodeQueue === undefined) {
    vertical = false;
    nodeQueue = [];
    let a = 0;
    width = 1;
    height = 2;
    while (data[a + 1] !== undefined && data[a].neighbors.includes(++a)) width++;
    let delta = a;
    while (data[a + delta] !== undefined) {
      height++;
      a += delta;
    }
    totalWidth = width;
    totalHeight = height;
    // r_start = Math.floor(r_height / 2) * r_width;
    queue = [{ firstNode: 0, r_width: width, r_height: height, vertical }];
    extraParams = { ...extraParams, width, height, firstNode: 0, totalWidth: width, totalHeight: height };
  }
  if (nodeQueue.length === 0) {
    if (queue.length === 0) {
      return { running: false, deltaHoles: [], deltaWalls: [], generationData, extraParams };
    }
    let { firstNode, r_width, r_height, vertical } = queue.pop();
    width = r_width;
    height = r_height;
    extraParams = { ...extraParams, firstNode, vertical, height: r_height, width: r_width };
    r_start = firstNode + (vertical ? Math.floor(r_width / 2) : Math.floor(r_height / 2) * totalWidth);
    r_end = r_start + (vertical ? r_height * totalWidth : r_width);
    let pass = r_start + Math.round(Math.random() * (r_end - r_start));
    if (vertical) pass = Math.floor(pass / totalWidth) * totalWidth; //transform it to y value
    if (pass === (r_end - r_start) / 2 + r_start) pass -= 1;
    for (let n = r_start; n < r_end; n++)
      if (vertical) {
        // if (n !== pass)
        nodeQueue.push(n);
        n += totalWidth - 1;
      } else {
        // if (n === pass) continue;
        nodeQueue.push(n);
      }
  }
  extraParams = { ...extraParams, nodeQueue, r_start, r_end, width, height };
  let deltaWalls = [nodeQueue.pop()];
  if (nodeQueue.length === 0) {
    if (vertical) {
      //now it will be horizontal
      let newWidth = Math.floor(width / 2); //one less tile
      if (width > 2 && height > 2 && newWidth !== width) {
        //first half
        queue.push({ vertical: !vertical, firstNode: firstNode + newWidth + 1, r_width: width - newWidth - 1, r_height: height });
        //second half
        queue.push({ vertical: !vertical, firstNode, r_width: newWidth, r_height: height });
        width = newWidth;
        // console.log(firstNode + width + (width % 2), width, height, vertical);
        // console.log(firstNode, width, height, vertical);
      }
    } else {
      let newHeight = Math.floor(height / 2);
      if (height > 2 && width > 2) {
        //now vertical
        //first half
        if (firstNode + (newHeight + 1) * totalWidth < (totalHeight - 1) * totalWidth)
          queue.push({
            vertical: !vertical,
            firstNode: firstNode + (newHeight + 1) * totalWidth,
            r_width: width,
            r_height: height - newHeight - 1,
          });
        //second half
        queue.push({ vertical: !vertical, firstNode, r_width: width, r_height: newHeight });
        // console.log(firstNode + (height + (height % 2)) * totalWidth, width, height);
        // console.log(firstNode, width, height, vertical);
        height = newHeight;
      }
    }
    extraParams = { ...extraParams, width, height, vertical: !vertical };
  }
  generationData = { ...generationData, running, extraParams, queue };
  return { running, deltaHoles: [], deltaWalls, generationData, extraParams };
}
