import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterState} from "@angular/router";
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ProductService} from "../../services/product.service";
import {ProductInterface} from "../../interfeses/product.interface";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  form!: FormGroup;
  // editForm: FormGroup;
  product: ProductInterface;
  productTitle: string;
  buttonTitle: string;
  option: boolean = true;
  isNewObject: boolean = true

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    console.log('product:', this.product)
    let productId = this.route.snapshot.paramMap.get('id');
    console.log('productId:', productId)

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
    });
    this.productTitle = "Add Product"
    this.buttonTitle = "Add"

    if (productId) {
      this.isNewObject = false;
      this.productService.getProductById(+productId)
        .subscribe(data => {
          this.form.setValue(data);
        });
      this.productTitle = "Edit Product"
      this.buttonTitle = "Update"
    } else{
      this.isNewObject = true;
    }
  }

  onSubmit(): void {
    if(this.isNewObject){
      this.productService.createProduct(this.form.value)
        .subscribe(data => {
          this.router.navigate(['list']);
        });

    } else {
      this.productService.updateProduct(this.form.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data) {
              alert('ProductInterface updated successfully.');
              this.router.navigate(['list']);
            } else {
              alert('Something went wrong!');
            }
          },
          error => {
            alert(error);
          });
    } return
  }

  onBack() {
    this.router.navigate(['list']);
  }

  test(data: any) {
    console.log('test:::',data);
  }
}

