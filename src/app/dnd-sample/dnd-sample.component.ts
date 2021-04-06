import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CdkDropListGroup, CdkDropList, CdkDragMove, CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dnd-sample',
  templateUrl: './dnd-sample.component.html',
  styleUrls: ['./dnd-sample.component.css']
})
export class DndSampleComponent implements OnInit, AfterViewInit {
  pathList: FormArray;
  listIndexes: Array<Array<number>>;
  chipMargin = 10;

  // drag and drop fields
  @ViewChild("buildercontainer") builderContainer: ElementRef; 
  @ViewChildren("piecebox", {read: ElementRef, emitDistinctChangesOnly: true}) pieces: QueryList<any>;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.pathList = new FormArray([]);
    this.pathList.push(this.createPathPiece("chip", "4x Long Long Long Long String", ""));
    this.pathList.push(this.createPathPiece("chip", "String", ""));
    this.pathList.push(this.createPathPiece("chip", "4x Long Long Long Long String", ""));
    this.pathList.push(this.createPathPiece("chip", "22x Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long String", ""));
    this.pathList.push(this.createPathPiece("chip", "Str", ""));
    this.pathList.push(this.createPathPiece("chip", "Short String", ""));
    this.pathList.push(this.createPathPiece("chip", "String", ""));
    this.pathList.push(this.createPathPiece("chip", "3x Long Long Long String", ""));
    this.pathList.push(this.createPathPiece("chip", "XXS String", ""));
    this.pathList.push(this.createPathPiece("chip", "4x Long Long Long Long String", ""));
    this.pathList.push(this.createPathPiece("chip", "String", ""));
    this.pathList.push(this.createPathPiece("chip", "Short String", ""));
    this.pathList.push(this.createPathPiece("chip", "XS String", ""));

    this.listIndexes = [[]];
    this.pathList.controls.forEach((element, index) => {
      this.listIndexes[0].push(index);
    });
  }

  ngAfterViewInit() {
    this.wrapItems(this.builderContainer, this.pieces);
  }

  dropListDropped(event: CdkDragDrop<number>) {
    if(!event.container || !event.previousContainer)
      return;

    const sourceDnDListIndex = event.previousContainer.data;
    const targetDnDListIndex = event.container.data;
    const fromIndex = event.previousIndex;
    const toIndex = event.currentIndex;

    if(sourceDnDListIndex === targetDnDListIndex && fromIndex === toIndex)
      return;

    let clonedListIndexes = this.listIndexes.map((itemArray, i) => {
      if(i == sourceDnDListIndex || i == targetDnDListIndex) {
        return [...itemArray];
      }
      return itemArray;
    });

    const sourceCli = clonedListIndexes[sourceDnDListIndex];
    const [item] = sourceCli.splice(fromIndex, 1);
    if(sourceDnDListIndex === targetDnDListIndex) {
      sourceCli.splice(toIndex, 0, item);
    }
    else {
      const targetCli = clonedListIndexes[targetDnDListIndex];
      targetCli.splice(toIndex, 0, item);
    }

    this.listIndexes = clonedListIndexes;

    setTimeout(() => {
      this.wrapItems(this.builderContainer, this.pieces);
    }, 0);
  }

  createPathPiece(type = 'input', name = '', value = '', error = false) {
    return this.fb.group({
      type: type,
      name: name,
      value: value,
      error: error,
    });
  }

  wrapItems(containerRef: ElementRef, pieceRefs: QueryList<any>) {
    const containerWidth = containerRef.nativeElement.offsetWidth;
    const listArr = this.listIndexes.reduce((acc, val) => acc.concat(val), []);
    const resultArr = [];
    
    pieceRefs.reduce((accumulator: number, currentValue: ElementRef, currentIndex: number) => {
      const newWidth = accumulator + currentValue.nativeElement.offsetWidth + this.chipMargin;
      let currectArrItem: number[];
      let returnAccValue: number;
      if(accumulator === 0) {
        currectArrItem = [];
        resultArr.push(currectArrItem);
      }
      else {
        currectArrItem = resultArr[resultArr.length - 1]
      }
      if(newWidth > containerWidth) {
        if(currectArrItem.length === 0) {
          returnAccValue = 0;
        }
        else {
          currectArrItem = [];
          resultArr.push(currectArrItem);
          returnAccValue = currentValue.nativeElement.offsetWidth;
        }
      }
      else {
        returnAccValue = newWidth;
      }
      currectArrItem.push(listArr[currentIndex]);
      return returnAccValue;
    }, 0);
    this.listIndexes = resultArr;
  }
}
