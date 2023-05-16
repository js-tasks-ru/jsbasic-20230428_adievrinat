function makeFriendsList(friends) {
  const ul = document.createElement('UL');
  let li;
  let friend;

  for (friend of friends) {
    li = document.createElement('LI');
    li.append(`${friend.firstName} ${friend.lastName}`);
    ul.append(li);
  }

  return ul;
}
