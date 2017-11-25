# Node/JS Van Emde Boas tree implementation

A Van Emde Boas tree, also known as a vEB tree, is a tree data structure which implements an associative array with k-bit integer keys. It performs all operations in O(log k) time, or equivalently in O(log log K) time, where K = 2^k is the maximum number of elements that can be stored in the tree. The K is not to be confused with the actual number of elements stored in the tree, by which the performance of other tree data-structures is often measured. The vEB tree has good space efficiency when it contains a large number of elements.

vEB Tree supports the operations of an ordered associative array, which includes the usual associative array operations along with two more order operations, FindNext and FindPrevious:
- Insert: insert a key/value pair with an k-bit key
- Delete: remove the key/value pair with a given key
- Lookup: find the value associated with a given key
- FindNext: find the key/value pair with the smallest key at least a given x
- FindPrevious: find the key/value pair with the largest key at most a given x
